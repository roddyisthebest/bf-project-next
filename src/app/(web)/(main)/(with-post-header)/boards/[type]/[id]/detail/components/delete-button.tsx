"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DeleteButton({ 
  postId, 
  postType 
}: { 
  postId: number; 
  postType: string; 
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);

      if (error) {
        throw new Error(`게시글 삭제 실패: ${error.message}`);
      }

      toast.success("게시글이 삭제되었습니다.");
      router.push(`/boards/${postType}`);
    } catch (e) {
      toast.error(
        "게시글 삭제에 실패했습니다: " +
          (e instanceof Error ? e.message : String(e))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className="h-4 w-4 mr-1" />
      {loading ? "삭제 중..." : "삭제"}
    </Button>
  );
}