import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.cookies.has("next-auth.session-token")) {
    console.log("we found it don't worry");
  } else {
    console.log("can't find it maaaaaaaa");
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/client/:path*", "/server:path*"],
};
