import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "HealthEdu AI — Your Personal Health Education Companion",
  description:
    "Learn about health, wellness, and medical topics through AI-powered education, quizzes, articles, and interactive learning modules.",
  keywords:
    "health education, AI health assistant, wellness, medical terms, health quiz",
  openGraph: {
    title: "HealthEdu AI",
    description: "AI-powered health education platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
