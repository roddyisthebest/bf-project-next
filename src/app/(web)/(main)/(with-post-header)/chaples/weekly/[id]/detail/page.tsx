import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/funcs";
import { createClient } from "@/lib/supabase/server";
import { PostView, PageProps } from "@/types";
import { Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrintButton } from "../../../../boards/[type]/[id]/detail/components/print-button";
import { PDFViewer } from "@/components/ui/pdf-viewer";
import React from "react";

export default async function WeeklyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) notFound();

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles:user_id (
        id,
        name,
        role
      )
    `
    )
    .eq("id", postId)
    .eq("type", "weekly")
    .single<PostView>();

  if (!post) {
    return notFound();
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="flex flex-col gap-y-6 divide-y print-content">
      <div className="flex flex-col gap-y-4 p-6">
        <h1 className="text-black font-bold text-5xl max-xl:text-4xl max-lg:text-3xl max-sm:text-xl">
          {post.title || "No Title"}
        </h1>
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-primary-50 border-primary-100 text-primary text-sm py-2 px-3 font-semibold flex gap-x-2">
              <Calendar />
              {formatDate(post.created_at)}
            </Badge>
            <Badge className="bg-primary-50 border-primary-100 text-primary text-sm py-2 px-3 font-semibold flex gap-x-2">
              <User />
              {post.profiles?.name || "익명"}
            </Badge>
          </div>

          <div className="flex gap-2">
            <PrintButton />
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="prose prose-lg max-w-none print-only-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children, ...props }) => {
                // p 태그 내부에 PDF 링크가 있는지 확인
                const hasFileLink = React.Children.toArray(children).some(
                  (child: any) => {
                    return (
                      child?.props?.href &&
                      /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i.test(
                        child.props.href
                      )
                    );
                  }
                );

                // PDF 링크가 있으면 div로 렌더링
                if (hasFileLink) {
                  return <div {...props}>{children}</div>;
                }

                return <p {...props}>{children}</p>;
              },
              a: ({ href, children, ...props }) => {
                // PDF 링크 감지
                if (href && /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i.test(href)) {
                  const fileName = Array.isArray(children)
                    ? children.join("")
                    : String(children || "file");

                  // PDF만 미리보기 지원
                  if (/\.pdf$/i.test(href)) {
                    return <PDFViewer url={href} fileName={fileName} />;
                  }

                  // 다른 파일은 다운로드 링크로
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }

                // 일반 링크
                return (
                  <a href={href} {...props}>
                    {children}
                  </a>
                );
              },
            }}
          >
            {post.content || "내용이 없습니다."}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
