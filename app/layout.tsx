import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cookie Facile - Gestione Cookie GDPR",
  description: "Piattaforma SaaS per la gestione dei banner cookie conformi a GDPR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
