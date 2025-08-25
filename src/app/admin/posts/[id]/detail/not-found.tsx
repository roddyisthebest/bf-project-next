// app/admin/posts/[id]/detail/not-found.tsx
import Link from "next/link";

function ChemTile({
  sym,
  num,
  name,
}: {
  sym: string;
  num: number;
  name?: string;
}) {
  return (
    <div className="relative grid aspect-square w-16 place-items-center rounded-md border border-emerald-400/50 bg-emerald-900/30 p-2 shadow-[0_0_40px_0_rgba(16,185,129,0.12)] backdrop-blur-[1px]">
      <span className="absolute left-1 top-1 text-[10px] text-emerald-200/80">
        {num}
      </span>
      <span className="text-3xl font-extrabold tracking-tight text-emerald-100">
        {sym}
      </span>
      {name && (
        <span className="absolute bottom-1 right-1 text-[10px] text-emerald-100/70">
          {name}
        </span>
      )}
    </div>
  );
}

export default function PostNotFound() {
  return (
    <main className="relative min-h-dvh bg-[#0b0f0a] text-emerald-100 antialiased overflow-hidden">
      {/* Vignette + subtle noise */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(90deg,rgba(255,255,255,0.15)_0_1px,transparent_1px_3px)]" />

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30 animate-scanlines [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]" />

      {/* Chemical haze (smoke) */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden mix-blend-screen">
        <div
          className="absolute -bottom-8 left-[15%] h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl animate-smoke"
          style={
            {
              ["--rise" as any]: "140px",
              ["--dx" as any]: "12px",
              ["--dur" as any]: "7s",
            } as React.CSSProperties
          }
        />
        <div
          className="absolute bottom-10 right-[18%] h-60 w-60 rounded-full bg-lime-300/10 blur-3xl animate-smoke"
          style={
            {
              ["--rise" as any]: "180px",
              ["--dx" as any]: "-16px",
              ["--dur" as any]: "9s",
            } as React.CSSProperties
          }
        />
      </div>

      {/* Content */}
      <section className="relative z-10 mx-auto grid min-h-dvh max-w-4xl place-items-center px-6">
        <div className="w-full text-center">
          {/* Logo-ish headline */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <ChemTile sym="Br" num={35} name="Bromine" />
            <ChemTile sym="Ba" num={56} name="Barium" />
            <span className="ml-2 select-none text-sm tracking-widest text-emerald-300/70">
              — stay out of my territory —
            </span>
          </div>

          <h1 className="mb-2 text-5xl font-black leading-none tracking-tight text-emerald-200 drop-shadow-[0_0_20px_rgba(16,185,129,0.35)] animate-glow">
            404 • Not Found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-emerald-200/80">
            찾으시는 게시글이 없거나 삭제되었습니다. <br />
            <span className="text-emerald-300/80">
              (It doesn’t exist, Jesse.)
            </span>
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin/posts"
              className="group relative rounded-lg border border-emerald-500/60 bg-emerald-900/30 px-5 py-3 font-medium text-emerald-100 backdrop-blur-[1px] transition hover:bg-emerald-800/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.28)]"
            >
              <span className="relative z-10">게시글 목록으로</span>
              <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition group-hover:opacity-100 [box-shadow:inset_0_0_24px_rgba(16,185,129,0.35)]" />
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] transition hover:bg-emerald-500 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]"
            >
              홈으로
            </Link>
          </div>

          {/* Tiny CRT footer */}
          <div className="mt-8 select-none text-xs text-emerald-300/60 animate-flicker">
            CHEMICAL ERROR CODE: NF-404
          </div>
        </div>
      </section>
    </main>
  );
}
