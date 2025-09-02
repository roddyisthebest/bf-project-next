import { Separator } from "@/components/ui/separator";
import EmailForm from "./components/email-form";
import { GoogleButton } from "./components/google-button";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30 flex justify-center items-center p-4 relative overflow-hidden">
      {/* 고급스러운 배경 패턴 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-brand-600/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-brand-600/5 to-transparent rounded-full blur-2xl" />
      </div>
      
      {/* 미니멀 그리드 */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* 메인 컨테이너 */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative">
          {/* 내부 글로우 */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-brand-50/20 pointer-events-none" />
          
          {/* 로고 섹션 */}
          <div className="flex flex-col items-center mb-8 relative">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-brand-600/10 rounded-full blur-xl scale-150" />
              <Link href="/" className="relative block">
                <Image
                  src="/logo_transparent.png"
                  alt="큰숲교회 로고"
                  width={80}
                  height={80}
                  className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-brand-600 bg-clip-text text-transparent mb-3">
                로그인
              </h1>
              <p className="text-gray-600 text-sm mb-4">큰숲교회에 오신 것을 환영합니다</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-brand-600 rounded-full" />
                <div className="w-2 h-2 bg-brand-600 rounded-full" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-brand-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* 로그인 폼 */}
          <div className="space-y-6">
            <EmailForm />
            
            <div className="relative">
              <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 py-1 text-sm text-gray-500 rounded-full border border-gray-200/50">
                  또는
                </span>
              </div>
            </div>
            
            <GoogleButton />
          </div>
          
          {/* 하단 장식 */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
              <div className="w-1 h-1 bg-brand-600/30 rounded-full" />
              <span>세상을 향한 산소같은 교회</span>
              <div className="w-1 h-1 bg-brand-600/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
