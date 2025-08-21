// app/auth/logout/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });

  const supabase = await createClient();

  await supabase.auth.signOut();

  return res;
}
