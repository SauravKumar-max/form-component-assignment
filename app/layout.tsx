import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajargh Kreation Form Component",
  description: "Ajargh Kreation Section B Assignment - Form Component",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-700 max-w-md m-auto font-sans">{children}</body>
    </html>
  );
}
