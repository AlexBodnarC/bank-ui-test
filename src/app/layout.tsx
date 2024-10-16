import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { UIProvider } from "~/providers/ui/provider";
import NavBar from "~/components/featres/nav-bar/navbar";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-black ${GeistSans.variable}`}>
      <body className="bg-black">
        <UIProvider>
          <main className="flex justify-between bg-black dark md:h-[100dvh]">
            <NavBar />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </main>
        </UIProvider>
      </body>
    </html>
  );
}
