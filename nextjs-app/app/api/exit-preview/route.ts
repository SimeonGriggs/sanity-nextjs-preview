// ./nextjs-app/app/api/exit-preview/route.ts

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  draftMode().disable();
  redirect(`/`);
}