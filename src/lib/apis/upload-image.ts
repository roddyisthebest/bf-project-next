import { BUCKET } from "@/consts";
import { createClient } from "../supabase/client";

export async function uploadPostImage(file: File): Promise<string> {
  // 파일 확장자/경로 생성
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const path = `posts/${new Date()
    .toISOString()
    .slice(0, 10)}/${crypto.randomUUID()}.${ext}`;

  const supabase = createClient();

  // 업로드
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || `image/${ext}`,
  });

  if (error) {
    throw new Error(`이미지 업로드 실패: ${error.message}`);
  }

  // 퍼블릭 버킷이면 공개 URL 바로 사용
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl; // ⬅️ 마크다운에 넣을 URL
}
