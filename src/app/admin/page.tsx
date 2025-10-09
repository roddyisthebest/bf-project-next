import Link from "next/link";
import {
  Shield,
  Church,
  Newspaper,
  ChevronRight,
} from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-white text-gray-900 antialiased">
      <section className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                관리자 대시보드
              </h1>
              <p className="text-gray-600">
                큰숲교회 웹사이트 관리 시스템
              </p>
            </div>
          </div>
        </header>

        {/* Info banner */}
        <div className="mb-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <Church className="mt-0.5 h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-emerald-800">
                큰숲교회 관리자 전용
              </p>
              <p className="text-sm text-emerald-700">
                이 대시보드는 큰숲교회 관리자만 사용할 수 있습니다. 
                게시글과 예배 정보를 관리하여 성도들에게 더 나은 서비스를 제공해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions / cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Posts */}
          <Link
            href="/admin/posts"
            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-emerald-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Newspaper className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                게시글 관리
              </h2>
            </div>
            <p className="mt-3 text-gray-600">
              교회 소식, 예배 정보, 갤러리 등의 게시글을 작성하고 관리합니다.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-blue-600 font-medium">
              게시글 관리하기
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Chaples */}
          <Link
            href="/admin/chaples"
            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-emerald-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Church className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                예배 관리
              </h2>
            </div>
            <p className="mt-3 text-gray-600">
              주일예배, 수요예배, 금요기도회 등의 예배 정보를 등록하고 관리합니다.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-emerald-600 font-medium">
              예배 관리하기
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-xs text-gray-500">
          큰숲교회 관리자 시스템 v1.0 · 모든 활동이 기록됩니다.
        </div>
      </section>
    </main>
  );
}
