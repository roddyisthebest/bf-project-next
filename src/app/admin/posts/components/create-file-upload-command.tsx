// components/PostForm.tsx (PDF 파일 업로드 커맨드)
import { commands, ICommand } from "@uiw/react-md-editor";
import { uploadPostFile } from "@/lib/apis/upload-file";
import { FileText } from "lucide-react";

// 툴바용 파일 업로드 커맨드 (file input을 내부에서 생성/클릭)
export function createFileUploadCommand(
  onUploaded: (url: string, fileName: string) => void
): ICommand {
  return {
    name: "file-upload",
    keyCommand: "file",
    buttonProps: { "aria-label": "Insert file from computer" },
    // PDF 아이콘 사용
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    ),
    execute: async (state, api) => {
      // hidden file input 만들어서 클릭
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt";
      input.style.display = "none";
      document.body.appendChild(input);

      input.onchange = async () => {
        const file = input.files?.[0];
        document.body.removeChild(input);
        if (!file) return;

        try {
          // ✅ Supabase 업로드
          const url = await uploadPostFile(file);

          // 커서 위치에 마크다운 링크 삽입
          const md = `[${file.name}](${url})`;
          api.replaceSelection(md);

          // 외부에서도 필요하면 콜백 사용 (예: 토스트)
          onUploaded?.(url, file.name);
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : "파일 업로드 실패";
          alert(message);
        }
      };

      input.click();
    },
  };
}
