import { createClient } from "@/utils/server";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${requestUrl.origin}/?login=success`, {
    status: 301,
  });
};
