// app/admin/page.tsx (또는 현재 파일 대체)
// Breaking Bad 스타일 어드민 대시보드
import Link from "next/link";
import {
  ShieldAlert,
  FlaskConical,
  Newspaper,
  ChevronRight,
} from "lucide-react";
import { CSSProperties } from "react";

interface CustomCSSProperties extends CSSProperties {
  '--rise'?: string;
  '--dx'?: string;
  '--dur'?: string;
}

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

export default function AdminPage() {
  return (
    <main className="relative min-h-dvh bg-[#0b0f0a] text-emerald-50 antialiased overflow-hidden">
      {/* Vignette + scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6))]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20 animate-scanlines [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]" />

      {/* Haze */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden mix-blend-screen">
        <div
          className="absolute bottom-10 left-[14%] h-40 w-40 rounded-full bg-emerald-400/12 blur-2xl animate-smoke"
          style={{
            '--rise': '160px',
            '--dx': '12px',
            '--dur': '8s',
          } as CustomCSSProperties}
        />
        <div
          className="absolute bottom-16 right-[12%] h-56 w-56 rounded-full bg-lime-300/10 blur-3xl animate-smoke"
          style={{
            '--rise': '200px',
            '--dx': '-16px',
            '--dur': '10s',
          } as CustomCSSProperties}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <header className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-3">
            <ChemTile sym="Br" num={35} name="Bromine" />
            <ChemTile sym="Ba" num={56} name="Barium" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-black tracking-tight text-emerald-100 drop-shadow-[0_0_16px_rgba(16,185,129,0.28)] animate-glow">
              Admin Control Panel
            </h1>
            <p className="mt-1 text-emerald-200/85">
              Manage posts & chaple data. Stay out of my territory.
            </p>
          </div>
        </header>

        {/* Warning banner */}
        <div className="mt-6 rounded-xl border border-emerald-700/50 bg-emerald-950/30 p-4 shadow-[0_0_24px_rgba(16,185,129,0.18)]">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 text-emerald-300" />
            <div>
              <p className="font-semibold text-emerald-100">
                Restricted Access
              </p>
              <p className="text-sm text-emerald-200/85">
                This dashboard is for authorized administrators{" "}
                <strong>only</strong>. If you are not authorized, consider this
                your only warning:{" "}
                <span className="font-semibold">
                  unauthorized access will be logged, traced, and may result in
                  legal consequences.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions / cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Posts */}
          <Link
            href="/admin/posts"
            className="group block rounded-2xl border border-emerald-700/50 bg-emerald-950/20 p-6 shadow-[0_0_28px_rgba(16,185,129,0.18)] transition hover:bg-emerald-900/25 hover:shadow-[0_0_36px_rgba(16,185,129,0.28)]"
          >
            <div className="flex items-center gap-3">
              <Newspaper className="h-6 w-6 text-emerald-300" />
              <h2 className="text-xl font-bold text-emerald-100">
                Posts Management
              </h2>
            </div>
            <p className="mt-2 text-emerald-200/85">
              Create, edit, and organize posts. Keep the signal clean.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-emerald-300">
              Go to Posts{" "}
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Chaples */}
          <Link
            href="/admin/chaples"
            className="group block rounded-2xl border border-emerald-700/50 bg-emerald-950/20 p-6 shadow-[0_0_28px_rgba(16,185,129,0.18)] transition hover:bg-emerald-900/25 hover:shadow-[0_0_36px_rgba(16,185,129,0.28)]"
          >
            <div className="flex items-center gap-3">
              <FlaskConical className="h-6 w-6 text-emerald-300" />
              <h2 className="text-xl font-bold text-emerald-100">
                Chaple Management
              </h2>
            </div>
            <p className="mt-2 text-emerald-200/85">
              Register and curate chaple entries (YouTube link, verse, type).
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-emerald-300">
              Go to Chaples{" "}
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-xs text-emerald-300/70">
          ACCESS CODE: AC-001 &middot; All activities are monitored and
          recorded.
        </div>
      </section>
    </main>
  );
}
