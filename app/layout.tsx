import "./globals.css";
import QueryProvider from "@/provider/QueryProvider";
import TostifyProvider from "@/provider/TostifyProvider";
import AuthProvider from "./AuthProvider";
import { Metadata } from "next";
import { Inter, Poppins, Quicksand, Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });
const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rise Up Mora",
  description:
    "Rise Up Mora is organized by IEEE Student branch of University of Moratuwa",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
         <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} ${poppins.className} ${quicksand.className} ${roboto.className}`}
      >
        <AuthProvider>
          <QueryProvider>
            {children}
            <Analytics />
            <TostifyProvider />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
