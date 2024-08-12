import "~/styles/globals.css";
import { TopNav } from "./_components/topnav";

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";



export const metadata: Metadata = {
  title: "Catllery",
  description: "Generated nenedacosta",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${GeistSans.variable} flex flex-col gap-4`}>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}