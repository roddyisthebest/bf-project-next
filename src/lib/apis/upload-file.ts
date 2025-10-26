import { BUCKET } from "@/consts";
import { createClient } from "../supabase/client";

export async function uploadPostFile(file: File): Promise<string> {
  // 파일 확장자/경로 생성
  const ext = (file.name.split(".").pop() || "pdf").toLowerCase();
  const path = `files/${new Date()
    .toISOString()
    .slice(0, 10)}/${crypto.randomUUID()}.${ext}`;

  const supabase = createClient();

  // 업로드
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || `application/${ext}`,
  });

  if (error) {
    throw new Error(`파일 업로드 실패: ${error.message}`);
  }

  // 퍼블릭 버킷이면 공개 URL 바로 사용
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}