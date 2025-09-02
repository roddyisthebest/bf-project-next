import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3),transparent_50%)]" />
        <div className="absolute inset-0 [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_21px)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 교회 정보 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/pure_logo.png"
                alt="큰숲교회 로고"
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                큰숲교회
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-100 text-sm font-medium mb-1">
                      주소
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      경기도 평택시 장당길 59(장당동)
                      <br />
                      경기도 평택시 장당동 641-8
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-100 text-sm font-medium mb-1">
                      연락처
                    </p>
                    <p className="text-gray-300 text-sm">031-665-2004</p>
                    <p className="text-gray-400 text-xs mt-1">
                      우편번호: 17740
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 카피라이트 */}
          <div className="flex flex-col justify-end items-end">
            <div className="text-right">
              <p className="text-xs text-gray-400 leading-relaxed">
                Copyright © 2025{" "}
                <a href="https://github.com/roddyisthebest" target="_blank" rel="noopener noreferrer" className="text-emerald-300 font-medium hover:text-emerald-200 transition-colors">shy</a>
                <br />
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="mt-8 pt-6 border-t border-gray-600/30">
          <p className="text-center text-xs text-gray-500">
            &quot;아마존이 세계의 산소를 공급하듯이, 우리 큰숲교회는 아름다운 세상을
            향한 산소를 공급합니다&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
