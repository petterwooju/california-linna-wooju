import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "California, Linna & Wooju — 2026 加州公路旅行",
    description: "9月21日至10月4日，从旧金山出发，经 Yosemite、Lake Tahoe、Sacramento、Napa Valley 到 Sunnyvale 的逆时针互动路线、逐小时时间表和住宿计划。",
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: {
      title: "California, Linna & Wooju",
      description: "14 calendar days · 42 stops · 5 stays",
      type: "website",
      url: origin,
      siteName: "California Field Journal",
      locale: "zh_CN",
    },
    twitter: {
      card: "summary",
      title: "California, Linna & Wooju",
      description: "14 calendar days · 42 stops · 5 stays",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
