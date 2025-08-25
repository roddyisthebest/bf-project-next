import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../components/post-form";
import { PostBody } from "@/types";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function create(values: PostBody) {
    "use server"; // 서버 액션 사용 시

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

    console.log(error, inserted);
    if (error) {
      throw new Error(`posts insert 실패: ${error.message}`);
    }

    const postId = inserted!.id as number;
    // 성공적으로 생성된 후 리다이렉트 (예: 상세 페이지로)
    return postId;
  }

  return <PostForm onSubmit={create} submitText="Create Post" />;
}
