// app/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const errorDesc = url.searchParams.get("error_description");

  if (errorDesc) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorDesc)}`, url.origin)
    );
  }

  if (!code) {
    // 이메일/구글 모두 여기로 오는데 code 없으면 로그인으로
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent("Missing code")}`, url.origin)
    );
  }

  // 너가 만든 createClient()는 next/headers의 cookies()를 써서
  // 여기(Route Handler)에서는 Set-Cookie가 응답에 잘 실림
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin)
    );
  }

  return NextResponse.redirect(new URL(url.origin));
}
