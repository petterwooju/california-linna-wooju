import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "California, written in light — 14日加州公路旅行",
    description: "从旧金山、优胜美地、红杉国家公园与死亡谷到洛杉矶的 14 天互动行程、路线地图与旅行笔记。",
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: {
      title: "California, written in light",
      description: "14 days · 6 regions · one California road story",
      type: "website",
      url: origin,
      siteName: "California Field Journal",
      locale: "zh_CN",
      images: [{ url: `${origin}/og.png`, width: 1734, height: 907, alt: "California road trip field journal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "California, written in light",
      description: "14 days · 6 regions · one California road story",
      images: [`${origin}/og.png`],
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
