import { notFound } from "next/navigation";
import { PostDetail } from "../../components/post-detail";
import { createClient } from "@/lib/supabase/server";
import { PageProps } from "@/types";

export default async function DetailPostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isFinite(postId)) notFound();

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*") // 필요한 컬럼만 골라서 select 해도 OK
    .eq("id", postId)
    .single();

  if (error || !post) {
    notFound(); // 404 페이지로
  }

  return <PostDetail post={post} />;
}
