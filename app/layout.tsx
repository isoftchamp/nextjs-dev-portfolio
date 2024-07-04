import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { GoogleTagManager } from "@next/third-parties/google";
import "react-toastify/dist/ReactToastify.min.css";
import "@/app/css/card.scss";
import "@/app/css/globals.scss";
import Navbar from "./ui/navbar";
import Footer from "./ui/footer";
import { personalData } from "./lib/data/personal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${personalData.name} - ${personalData.designation}`,
  description:
    "This is the portfolio of Xuanming L. I am a senior fullstack developer & devops. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
  metadataBase: new URL("https://xuanming.vercel.app"),
  keywords: "next.js, react, emailjs, google recaptcah, tailwind, portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM || ""} />
    </html>
  );
}
