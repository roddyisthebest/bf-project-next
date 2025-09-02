import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/funcs";
import { createClient } from "@/lib/supabase/server";
import { PostView, PageProps } from "@/types";
import { Calendar, User, Edit } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { DeleteButton } from "./components/delete-button";

export default async function BoardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) notFound();

  const supabase = await createClient();

  // 현재 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    .single<PostView>();

  if (!post) {
    return notFound();
  }

  if (error) {
    return <div>error</div>;
  }

  // 현재 사용자가 작성자인지 확인
  const isAuthor = user && user.id === (post.user_id as unknown as string);

  return (
    <div className="flex flex-col gap-y-6 divide-y">
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

          {isAuthor && (
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/boards/${post.type}/${post.id}/edit`}>
                  <Edit className="h-4 w-4 mr-1" />
                  수정
                </Link>
              </Button>
              {post.type && (
                <DeleteButton postId={post.id} postType={post.type} />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            // className="markdown-content"
          >
            {post.content || "내용이 없습니다."}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
