// components/PostForm.tsx (핵심 변경 부분만)
import { commands, ICommand } from "@uiw/react-md-editor";
import { uploadPostImage } from "@/lib/apis/upload-image";

// 툴바용 이미지 업로드 커맨드 (file input을 내부에서 생성/클릭)
export function createImageUploadCommand(
  onUploaded: (url: string) => void
): ICommand {
  return {
    name: "image-upload",
    keyCommand: "image",
    buttonProps: { "aria-label": "Insert image from computer" },
    // 기본 아이콘과 동일하게 보이도록
    icon: commands.image.icon,
    execute: async (state, api) => {
      // hidden file input 만들어서 클릭
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "none";
      document.body.appendChild(input);

      input.onchange = async () => {
        const file = input.files?.[0];
        document.body.removeChild(input);
        if (!file) return;

        try {
          // ✅ Supabase 업로드
          const url = await uploadPostImage(file);

          // 커서 위치에 마크다운 이미지 삽입
          const md = `![image](${url})`;
          api.replaceSelection(md);

          // 선택부를 이미지 끝으로 이동
          //   const pos = api.getState().selection.end + md.length;
          //   api.setSelectionRange({ start: pos, end: pos });

          // 외부에서도 필요하면 콜백 사용 (예: 토스트)
          onUploaded?.(url);
        } catch (e: any) {
          alert(e?.message ?? "이미지 업로드 실패");
        }
      };

      input.click();
    },
  };
}
