// app/admin/posts/[id]/edit/page.tsx
import { PostForm } from "../../components/PostForm";
export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  //   const post = await getPost(params.id); // DB에서 조회
  async function update(values: any) {
    "use server";
    // TODO: DB update
    // revalidatePath(`/admin/posts/${params.id}`); redirect(`/admin/posts/${params.id}`);
  }
  return (
    <PostForm
      initialValues={undefined}
      onSubmit={update}
      submitText="Update Post"
    />
  );
}
