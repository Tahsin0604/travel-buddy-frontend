import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "@/lib/Providers/Providers";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trip Buddy",
  description: "An app for finding trip partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AntdRegistry>{children}</AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
