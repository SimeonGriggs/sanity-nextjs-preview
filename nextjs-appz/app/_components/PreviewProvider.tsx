// ./nextjs-app/app/_components/PreviewProvider.tsx

"use client";

import { getClient } from "@/sanity/lib/getClient";
import { LiveQueryProvider } from "@sanity/preview-kit";
import { useMemo } from "react";

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const client = useMemo(() => getClient({token}), [token]);
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
