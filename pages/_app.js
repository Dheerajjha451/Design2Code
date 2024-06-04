import Header from "@/components/Header";
import "@/styles/globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SessionProvider } from "next-auth/react"
import { Analytics } from '@vercel/analytics/react';
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <>
    <SessionProvider>
      <main className={`${poppins.className} max-w-[1440px] mx-auto`}>
        <Header />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
    <SpeedInsights />
    <Analytics />
  </>
}
