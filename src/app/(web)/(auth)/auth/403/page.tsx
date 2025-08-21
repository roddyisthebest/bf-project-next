// app/auth/forbidden/page.tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "403 Forbidden",
  description: "Stay out of my territory.",
};

export default function ForbiddenPage() {
  return (
    <main className="relative min-h-dvh bg-black text-green-400 antialiased">
      {/* 배경 그레인/비네팅 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_3px)] mix-blend-overlay opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.8))]" />

      {/* 연기 레이어 (z 올라감 + blend로 가시성 강화) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[5] mix-blend-screen">
        {/* puff 1~6: 서로 다른 위치/속도/스케일/상승치 */}
        <div
          className="absolute bottom-20 left-[20%] h-32 w-32 rounded-full bg-emerald-300/25 blur-xl animate-smoke-strong animate-sway"
          style={{
            ["--dur" as any]: "4.2s",
            ["--rise" as any]: "-90px",
            ["--dx" as any]: "5px",
            ["--scale" as any]: "1.0",
          }}
        />
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-lime-300/20 blur-2xl animate-smoke-strong-2 animate-sway"
          style={{
            ["--dur" as any]: "5.2s",
            ["--rise" as any]: "-120px",
            ["--dx" as any]: "-6px",
            ["--scale" as any]: "1.05",
          }}
        />
        <div
          className="absolute bottom-24 right-[22%] h-28 w-28 rounded-full bg-green-200/30 blur-xl animate-smoke-strong-3 animate-sway"
          style={{
            ["--dur" as any]: "6s",
            ["--rise" as any]: "-110px",
            ["--dx" as any]: "4px",
            ["--scale" as any]: "0.95",
          }}
        />
        <div
          className="absolute bottom-10 left-[35%] h-24 w-24 rounded-full bg-emerald-200/30 blur-xl animate-smoke-strong"
          style={{
            ["--dur" as any]: "4.8s",
            ["--rise" as any]: "-80px",
            ["--dx" as any]: "3px",
            ["--scale" as any]: "0.9",
          }}
        />
        <div
          className="absolute bottom-12 left-[55%] h-28 w-28 rounded-full bg-emerald-300/20 blur-xl animate-smoke-strong-2"
          style={{
            ["--dur" as any]: "5.6s",
            ["--rise" as any]: "-100px",
            ["--dx" as any]: "-5px",
            ["--scale" as any]: "1.1",
          }}
        />
        <div
          className="absolute bottom-24 right-[35%] h-20 w-20 rounded-full bg-lime-200/25 blur-lg animate-smoke-strong-3"
          style={{
            ["--dur" as any]: "6.4s",
            ["--rise" as any]: "-110px",
            ["--dx" as any]: "6px",
            ["--scale" as any]: "0.85",
          }}
        />
      </div>

      {/* 컨텐츠 */}
      <section className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-6 text-center">
        {/* 브베 로고 오마주 */}
        <div className="mb-8 flex items-center gap-3 text-sm text-emerald-300/80">
          <span className="inline-flex h-9 items-center justify-center rounded-sm border border-emerald-500/60 bg-emerald-900/40 px-2 font-semibold tracking-wide">
            Br
          </span>
          <span className="inline-flex h-9 items-center justify-center rounded-sm border border-emerald-500/60 bg-emerald-900/40 px-2 font-semibold tracking-wide">
            Ba
          </span>
          <span className="ml-1 opacity-70">Forbidden</span>
        </div>

        {/* 헤드라인 */}
        <h1 className="mb-2 text-4xl font-extrabold leading-tight text-emerald-300 drop-shadow-sm md:text-6xl animate-glow">
          Stay out of my territory,
        </h1>

        {/* 총구 화염 + 텍스트 */}
        <div className="relative inline-block">
          <p className="mb-8 text-3xl font-black italic text-emerald-400/90 md:text-5xl animate-flicker select-none">
            Sir.
          </p>

          {/* muzzle flash: 텍스트 오른쪽 살짝 위에서 번쩍 */}
          <span className="pointer-events-none absolute -right-6 top-2 block h-6 w-10 rounded-full bg-[oklch(0.95_0.18_120)] blur-[1px] opacity-0 animate-muzzle" />
          {/* sparks 3개: 각기 다른 방향으로 튐 */}
          <span
            className="pointer-events-none absolute -right-3 top-1 block h-2 w-2 rounded-full bg-yellow-300 opacity-0 animate-spark"
            style={{ ["--sx" as any]: "22px", ["--sy" as any]: "-14px" }}
          />
          <span
            className="pointer-events-none absolute -right-5 top-4 block h-2 w-2 rounded-full bg-yellow-200 opacity-0 animate-spark"
            style={{ ["--sx" as any]: "16px", ["--sy" as any]: "-8px" }}
          />
          <span
            className="pointer-events-none absolute -right-2 top-6 block h-2 w-2 rounded-full bg-amber-200 opacity-0 animate-spark"
            style={{ ["--sx" as any]: "26px", ["--sy" as any]: "-20px" }}
          />
        </div>

        {/* 서브 카피 */}
        <p className="mx-auto max-w-xl text-emerald-200/70">
          You don’t have permission to access this resource. If you believe this
          is an error, contact your admin.
        </p>

        {/* 액션 */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl border border-emerald-600/60 bg-emerald-900/30 px-5 py-3 text-emerald-200 transition hover:bg-emerald-800/40"
          >
            Go Home
          </Link>
          <Link
            href="/login"
            className="rounded-xl bg-emerald-600/80 px-5 py-3 text-black font-semibold transition hover:bg-emerald-500"
          >
            Sign In with another account
          </Link>
        </div>
      </section>
    </main>
  );
}
