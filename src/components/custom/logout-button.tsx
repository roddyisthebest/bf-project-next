// components/custom/logout-button.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    console.log("clicked logout1");

    try {
      // 서버 액션으로 로그아웃
      const response = await fetch("/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Logout response status:", response.status);

      if (!response.ok) {
        console.error("Logout failed with status:", response.status);
        const errorText = await response.text();
        console.error("Error response:", errorText);
        return;
      }

      // /admin에서 나왔으면 홈으로
      if (pathname.startsWith("/admin")) {
        router.push("/");
      } else {
        // 새로고침으로 상태 초기화
        window.location.reload();
      }
    } catch (err) {
      console.error("Logout network error:", err);
      // 네트워크 에러에도 새로고침 시도
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-center px-4 py-2 text-sm bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors cursor-pointer"
    >
      로그아웃
    </button>
  );
}
