import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  // const roles = { admin:['/dashboard','/server','client'],
  //   doctor:['client'],
  //   manager:['server'],


  // }

  if (!request.cookies.has("next-auth.session-token")) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  } 
}

export const config = {
  matcher: ["/client/:path*", "/server:path*"],
};
