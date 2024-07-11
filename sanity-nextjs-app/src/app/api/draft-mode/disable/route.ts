// ./src/app/api/draft-mode/disable/route.ts

import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  draftMode().disable();
  return NextResponse.redirect(new URL("/", request.url));
}
