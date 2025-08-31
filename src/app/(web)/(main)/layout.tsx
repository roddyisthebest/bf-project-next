import Header from "@/app/(web)/(main)/components/header/header";
import HeroCarousel from "@/app/(web)/(main)/components/hero-carousel";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-dvh bg-white text-emerald-900 antialiased">
      {/* BB 감성: 은은한 그린 라디얼 + 케미스트리 그리드 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(90deg,rgba(16,185,129,0.045),rgba(16,185,129,0.045)_1px,transparent_1px,transparent_24px)] opacity-40" />
      <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(16,185,129,0.035),rgba(16,185,129,0.035)_1px,transparent_1px,transparent_24px)] opacity-40" />

      <Header />
      <HeroCarousel />
      <main className="relative z-10 px-36 max-xl:px-6  max-md:px-4 ">
        {children}
      </main>
      <footer className="h-24 bg-primary"></footer>
    </div>
  );
}
