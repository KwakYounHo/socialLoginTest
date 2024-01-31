import { createClient } from "@/utils/middleware";
import { type NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const { supabase, response } = createClient(req);

  await supabase.auth.getSession();

  return response;
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
