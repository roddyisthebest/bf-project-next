// components/custom/logout-button.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/auth/signout", { method: "POST" });

    // /admin에서 나왔으면 홈으로
    if (pathname.startsWith("/admin")) {
      router.push("/");
    }

    router.refresh();
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="rounded-xl border-emerald-200 text-emerald-800 hover:bg-emerald-50"
    >
      로그아웃
    </Button>
  );
}
