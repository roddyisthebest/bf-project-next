import { notFound } from "next/navigation";
import { PostDetail } from "../../components/post-detail";
import { createClient } from "@/lib/supabase/server";
type PageProps = {
  params: { id: string };
};

export default async function DetailPostPage({ params }: PageProps) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*") // 필요한 컬럼만 골라서 select 해도 OK
    .eq("id", id)
    .single();

  if (error || !post) {
    // console.error(error);
    notFound(); // 404 페이지로
  }

  return <PostDetail post={post} />;
}
