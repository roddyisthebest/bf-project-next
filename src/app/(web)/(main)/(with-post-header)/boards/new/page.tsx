import { PostBody } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BoardCreateForm } from "./components/board-create-form";
import { POST_TYPE_LABELS } from "@/lib/constants/post-types";

export default async function NewBoardPage() {
  const supabase = await createClient();

  // 현재 사용자 확인
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  async function create(values: PostBody) {
    "use server";

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("로그인이 필요합니다.");
    }

    const { data: created, error } = await supabase
      .from("posts")
      .insert({
        ...values,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select("id, type")
      .single();

    if (error) {
      throw new Error(`게시글 생성 실패: ${error.message}`);
    }

    const createdPostId = created!.id as number;
    const postType = created!.type;
    
    // 성공 시 postId와 type 반환
    return { id: createdPostId, type: postType };
  }

  const typeLabels = POST_TYPE_LABELS;

  return (
    <div className="p-6">
      <BoardCreateForm 
        onSubmit={create} 
        submitText="게시글 작성"
        typeLabels={typeLabels}
      />
    </div>
  );
}