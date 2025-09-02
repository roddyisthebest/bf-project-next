import { createClient } from "@/lib/supabase/server";
import { PostView } from "@/types";
import { ImageCarouselClient } from "./image-carousel-client";

export default async function ImageCarousel() {
  const supabase = await createClient();

  const { data: imagePosts, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles:user_id (
        id,
        name,
        role
      )
    `)
    .eq("type", "image")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center bg-red-50 border-y border-red-200">
        <div className="text-center">
          <p className="text-red-600 font-semibold">
            ⚠️ 이미지를 불러오지 못했습니다.
          </p>
          {error?.message && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      </div>
    );
  }

  if (!imagePosts || imagePosts.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 border-y border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 font-medium">
            아직 업로드된 이미지가 없습니다.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            공지사항을 확인해 주세요.
          </p>
        </div>
      </div>
    );
  }

  return <ImageCarouselClient posts={imagePosts as PostView[]} />;
}