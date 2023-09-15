import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Database } from "./types";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const response = await supabase.auth.getSession();

  const isLoginPage = req.nextUrl.pathname.includes("login");
  const isHomeDir = req.nextUrl.pathname == "/";

  if (response.data.session == null && !isLoginPage) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
  } else if (response.data.session != null && (isLoginPage || isHomeDir)) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL!}/reservations`
    );
  }

  return res;
}
