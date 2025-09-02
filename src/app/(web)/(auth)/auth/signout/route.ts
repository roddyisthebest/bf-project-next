// app/auth/logout/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  const supabase = await createClient();

  await supabase.auth.signOut();

  return res;
}
