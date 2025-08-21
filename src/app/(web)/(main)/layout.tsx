// app/(whatever)/layout.tsx or 해당 레이아웃 파일
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { NavigationMenuDemo } from "./components/navigation-menu";
import { LogoutButton } from "@/components/custom/logout-button";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative min-h-dvh bg-white text-emerald-900 antialiased">
      {/* BB 감성: 은은한 그린 라디얼 + 케미스트리 그리드 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(90deg,rgba(16,185,129,0.045),rgba(16,185,129,0.045)_1px,transparent_1px,transparent_24px)] opacity-40" />
      <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(16,185,129,0.035),rgba(16,185,129,0.035)_1px,transparent_1px,transparent_24px)] opacity-40" />

      <header className=" sticky top-0 border-b border-emerald-100 bg-gradient-to-b from-emerald-50/60 to-white backdrop-blur z-50">
        <div className="h-20 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* 타이틀에 살짝 BB 요소(엣지 라인 + 라운드) */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-lg font-bold leading-none">
                B
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-lg font-bold leading-none">
                F
              </span>
              <h1 className="ml-1 text-2xl font-semibold tracking-tight">
                Web App
              </h1>
            </div>

            <NavigationMenuDemo />
          </div>

          <nav className="flex items-center gap-2">
            {user ? (
              <LogoutButton />
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-800 hover:bg-emerald-50 rounded-xl"
                >
                  로그인
                </Button>
              </Link>
            )}
          </nav>
        </div>
        {/* 하단 에메랄드 라인 글로우 */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
      </header>
      <main className="relative z-10 px-36 max-xl:px-30 max-lg:px-18 max-md:px-6">
        {children}
      </main>
      <footer className="h-24 bg-primary"></footer>
    </div>
  );
}
