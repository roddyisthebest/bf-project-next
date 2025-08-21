import { PostForm } from "../components/PostForm";
export default function NewPostPage() {
  async function create(values: any) {
    "use server"; // 서버 액션 사용 시
    // TODO: DB insert
    // revalidatePath("/admin/posts"); redirect(`/admin/posts`);
  }
  return <PostForm onSubmit={create} submitText="Create Post" />;
}
