import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "./components/Footer";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
//import 'bootstrap/dist/css/bootstrap.min.css';
import localFont from "next/font/local";

const kiwiMaru = localFont({
  src: [
    {
      path: "../public/fonts/KiwiMaru-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/KiwiMaru-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/KiwiMaru-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1分でできるはじめて防災診断",
  description: "災害に備えるための知識を楽しく学べるクイズアプリ",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "防災クイズ",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "防災診断",
    title: "1分でできるはじめて防災診断",
    description: "災害に備えるための知識を楽しく学べるクイズアプリ",
  },
  twitter: {
    card: "summary",
    title: "1分でできるはじめて防災診断",
    description: "災害に備えるための知識を楽しく学べるクイズアプリ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${kiwiMaru.className} text-[#523B10]`}>
        <ServiceWorkerRegistration />
        <Header />
        {/* 全ページ共通の外枠（CSSクラス使用） */}
        <main className="full-page-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
