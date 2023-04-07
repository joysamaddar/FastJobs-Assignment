import AuthGuard from "@/guards/AuthGuard";
import "./globals.css";

import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "FastJobs - Bringing Top 1% Talent to you",
  description: "An assignment for FastJobs.io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmsans.className}>
        <AuthGuard protectedRoutes={["/dashboard"]}>
          {children}
        </AuthGuard>
        </body>
    </html>
  );
}
