import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "큰숲교회",
    template: "%s | 큰숲교회",
  },
  description:
    "큰숲교회는 하나님의 말씀을 중심으로 한 건강한 교회 공동체입니다.",
  keywords: "큰숲교회, 교회, 예배, 기독교, 주일예배, 수요예배",
  authors: [{ name: "큰숲교회" }],
  creator: "큰숲교회",
  publisher: "큰숲교회",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: ["/favicon.ico"],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "naver-site-verification": "fa5378357429bd11bedf8a1bae321bc9923cd8e4",
    "google-site-verification": "yWUHcOu02RIowX4Vqv0nSjbFbhvjf6NppyY6_4aM1cE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-w-[320px]`}
      >
        {children}
        <Script
          type="text/javascript"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
