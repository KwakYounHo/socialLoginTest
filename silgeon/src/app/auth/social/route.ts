import { type NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const res = NextResponse.next();
  console.log("요청은 옴");

  return res;
};
