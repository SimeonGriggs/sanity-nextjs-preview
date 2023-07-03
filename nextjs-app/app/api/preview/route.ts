// ./nextjs-app/app/api/preview/route.ts

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  draftMode().enable();
  redirect(`/`);
}