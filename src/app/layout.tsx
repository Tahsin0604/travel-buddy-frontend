import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "@/lib/Providers/Providers";
import { Toaster } from "sonner";

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
      <head>
        <link
          rel="icon"
          href="/icon/tourism.png"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body>
        <Providers>
          <AntdRegistry>
            <>
              <Toaster position="bottom-right" richColors />
              {children}
            </>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
