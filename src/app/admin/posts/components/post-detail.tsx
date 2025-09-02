// components/post-detail.tsx
"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PostType } from "@/enums";
import type { PostView } from "@/types";
import { Pencil, ImageIcon, Trash, Loader } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const extractFirstImageUrl = (md: string): string | null => {
  const regex = /!\[[^\]]*\]\((?<url>[^)\s]+)(?:\s+"[^"]*")?\)/;
  const match = md.match(regex);
  return match?.groups?.url ?? null;
};

const formatDateTime = (v: string | number | Date | null | undefined) => {
  if (!v) return "";
  const d = typeof v === "number" ? new Date(v) : new Date(String(v));
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

const typeLabel = (t: PostType | null | undefined) => {
  if (!t) return "분류 없음";
  const map: Partial<Record<string, string>> = {
    BOARD: "소통방",
    GALLERY: "사진/갤러리",
    TESTIMONY: "은혜 나눔터",
  };
  const key = String(t);
  return map[key] ?? key;
};

export function PostDetail({ post }: { post: PostView }) {
  const cover = React.useMemo(
    () => extractFirstImageUrl(post.content),
    [post.content]
  );

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    const isOkay = window.confirm(
      "정말 삭제하시겠습니까? This action cannot be undone."
    );

    if (!isOkay) {
      return;
    }
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.from("posts").delete().eq("id", post.id);
      if (error) {
        toast.error("삭제 중 오류가 발생했습니다: " + error.message);
        return;
      }
      router.replace("/admin/posts");
      toast.success("게시글이 삭제되었습니다.");
    } catch (e) {
      console.error(e);
      toast.error(
        "삭제 중 오류가 발생했습니다: " + (e instanceof Error ? e.message : e)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <article
      className={clsx(
        "relative mx-auto w-full px-4 py-8 ",
        "border border-emerald-700/40 bg-[#0b0f0a] text-emerald-50",
        "shadow-[0_0_36px_rgba(16,185,129,0.15)] overflow-hidden"
      )}
    >
      {/* CRT scanlines + inner glow */}
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20 animate-scanlines [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]" />
      <div className="pointer-events-none absolute inset-0 rounded-xl [box-shadow:inset_0_0_28px_rgba(16,185,129,0.12)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt="thumbnail"
              className="h-16 w-16 rounded-md border border-emerald-600/60 object-cover shadow-[0_0_18px_rgba(16,185,129,0.25)]"
            />
          ) : (
            <div className="h-16 w-16 flex items-center justify-center rounded-md border border-emerald-600/60 bg-emerald-900/30 text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.18)]">
              <ImageIcon className="h-8 w-8" />
            </div>
          )}

          <h1 className="text-3xl font-black tracking-tight text-emerald-100 drop-shadow-[0_0_16px_rgba(16,185,129,0.28)] animate-glow">
            {post.title}
          </h1>
        </div>
        <div className="flex items-center gap-x-2">
          <Link
            href={`/admin/posts/${post.id}/edit`}
            className={clsx(
              "group flex items-center gap-1 rounded-md border border-emerald-500/70 px-3 py-1 text-sm font-bold",
              "text-emerald-100 bg-emerald-900/20 hover:bg-emerald-800/30 transition",
              "shadow-[0_0_16px_rgba(16,185,129,0.15)] hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]"
            )}
          >
            <Pencil className="h-4 w-4" />
            <span className="relative z-10">수정</span>
          </Link>
          <button
            onClick={handleDelete}
            className={clsx(
              "group flex items-center gap-1 rounded-md border border-emerald-500/70 px-3 py-1 text-sm font-bold",
              "text-emerald-100 bg-emerald-900/20 hover:bg-emerald-800/30 transition",
              "shadow-[0_0_16px_rgba(16,185,129,0.15)] hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]"
            )}
            disabled={loading}
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Trash className="h-4 w-4" />
                <span className="relative z-10">삭제</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="relative z-10 mt-3 flex flex-wrap items-center gap-2 text-sm text-emerald-200/90">
        <Badge
          variant="outline"
          className="border-emerald-500/70 text-emerald-100 bg-emerald-900/20"
        >
          {typeLabel(post.type)}
        </Badge>
        <Separator orientation="vertical" className="h-4 bg-emerald-700/70" />
        <span>작성: {formatDateTime(post.created_at)}</span>
        <Separator orientation="vertical" className="h-4 bg-emerald-700/70" />
        <span>수정: {formatDateTime(post.updated_at)}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 prose prose-invert prose-a:underline max-w-none mt-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: (props) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 hover:text-emerald-200"
              />
            ),
            img: (props) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                {...props}
                className="my-4 rounded-md border border-emerald-700/60 shadow-[0_0_18px_rgba(16,185,129,0.18)]"
                alt={props.alt ?? ""}
              />
            ),
            table: (props) => (
              <div className="my-4 overflow-x-auto rounded-md border border-emerald-700/60 bg-emerald-900/20">
                <table
                  {...props}
                  className="min-w-full text-emerald-100 [&_th]:bg-emerald-900/40 [&_th]:text-emerald-200 [&_td]:border-emerald-800/60 [&_th]:border-emerald-800/60"
                />
              </div>
            ),
            code: ({ inline, children, ...rest }) =>
              inline ? (
                <code
                  {...rest}
                  className="rounded bg-emerald-900/40 px-1 py-0.5 text-emerald-100"
                >
                  {children}
                </code>
              ) : (
                <code
                  {...rest}
                  className="block rounded-md border border-emerald-800 bg-emerald-950/40 p-3 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.12)]"
                >
                  {children}
                </code>
              ),
            blockquote: (props) => (
              <blockquote
                {...props}
                className="border-l-4 border-emerald-600/70 bg-emerald-900/20 p-3 text-emerald-100"
              />
            ),
            hr: () => (
              <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-emerald-700/60 to-transparent" />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
