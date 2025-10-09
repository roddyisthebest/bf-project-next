// app/admin/posts/[id]/edit/page.tsx
import { PageProps, PostBody } from "@/types";
import { PostForm } from "../../components/post-form";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
export default async function EditPostPage({ params }: PageProps) {
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

  async function update(values: PostBody) {
    "use server";

    const supabase = await createClient();
    const { data: inserted, error } = await supabase
      .from("posts")
      .update({
        ...values,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId)
      .select("id")
      .single();

    if (error) {
      throw new Error(`posts insert 실패: ${error.message}`);
    }

    const updatedPostId = inserted!.id as number;
    // 성공적으로 생성된 후 리다이렉트 (예: 상세 페이지로)
    return updatedPostId;
  }
  const typeLabels = {
    gallery: "갤러리",
    testimony: "은혜나눔터",
    music: "찬양",
    weekly: "주보",
    talk: "소통방",
  };

  return (
    <PostForm initialValues={post} onSubmit={update} submitText="게시글 수정" typeLabels={typeLabels} />
  );
}
