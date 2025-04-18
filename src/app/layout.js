import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { EventProvider } from "@/context/EventsContext";
import Head from "next/head";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "Midas Promotions",
  description: "Asia's leading live entertainment company",
  icons: "/favicon.svg"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${inter.variable} font-sans ${inter.className}`}
      >
        <EventProvider>
          {children}
        </EventProvider>
      </body>
    </html>
  );
}
