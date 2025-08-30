import { PageProps, PostBody } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { BoardEditForm } from "./components/board-edit-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { POST_TYPE_LABELS } from "@/lib/constants/post-types";

export default async function EditBoardPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) notFound();

  const supabase = await createClient();

  // 현재 사용자 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error || !post) {
    notFound();
  }

  // 작성자 확인
  if (post.user_id !== user.id) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-red-800 mb-2">
              접근 권한이 없습니다
            </h1>
            <p className="text-red-600 mb-4">
              본인이 작성한 게시글만 수정할 수 있습니다.
            </p>
            <Button asChild variant="outline">
              <Link href={`/boards/${post.type}/${post.id}/detail`}>
                게시글로 돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  async function update(values: PostBody) {
    "use server";

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || post.user_id !== user.id) {
      throw new Error("권한이 없습니다.");
    }

    const { data: updated, error } = await supabase
      .from("posts")
      .update({
        ...values,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId)
      .select("id, type")
      .single();

    if (error) {
      throw new Error(`게시글 수정 실패: ${error.message}`);
    }

    const updatedPostId = updated!.id as number;
    const postType = updated!.type;

    // 성공 시 postId와 type 반환
    return { id: updatedPostId, type: postType };
  }

  const typeLabels = POST_TYPE_LABELS;

  return (
    <div className="p-6">
      <BoardEditForm
        initialValues={post}
        onSubmit={update}
        submitText="게시글 수정"
        typeLabels={typeLabels}
      />
    </div>
  );
}
