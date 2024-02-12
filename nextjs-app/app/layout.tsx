// ./app/layout.tsx

import { draftMode } from "next/headers";
import "./globals.css";
import LiveVisualEditing from "@/components/LiveVisualEditing";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
        {draftMode().isEnabled && <LiveVisualEditing />}
      </body>
    </html>
  );
}