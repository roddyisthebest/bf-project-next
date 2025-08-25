// app/admin/posts/[id]/edit/page.tsx
import { PostBody, PostView } from "@/types";
import { PostForm } from "../../components/post-form";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
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

  //   const post = await getPost(params.id); // DB에서 조회
  async function update(values: PostBody) {
    "use server";

    const supabase = await createClient();
    const { data: inserted, error } = await supabase
      .from("posts")
      .insert({
        title: values.title,
        content: values.content,
        thumbnail: values.thumbnail,
        type: values.type, // enum/text 컬럼 구조에 맞게
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(`posts insert 실패: ${error.message}`);
    }

    const postId = inserted!.id as number;
    // 성공적으로 생성된 후 리다이렉트 (예: 상세 페이지로)
    return postId;
  }
  return (
    <PostForm initialValues={post} onSubmit={update} submitText="Update Post" />
  );
}
