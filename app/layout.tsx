import type { Metadata } from "next";
import { jost } from "./lib/fonts";
import "./globals.css";
import { ModalProvider as ModalStateProvider } from "@/context/ModalContext";
import { BookingFormProvider } from "@/context/BookingFormContext";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import ModalProvider from "@/components/providers/ModalProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Exnihilo - Home",
  description: "Creative atelier & tattoo collective.",
  openGraph: {
    images: [
      {
        url: "/logo-big.jpeg",
        width: 1200,
        height: 630,
        alt: "Four of Foes logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="P-0jPOiphQXiOCfy8zi2eoTT1A40WeyUcze2nCUxk14"
        />
      </head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

      <body className={jost.className}>
        <ClerkProvider>
          <AppSettingsProvider>
            <ModalStateProvider>
              <BookingFormProvider>
                {children}
                <ModalProvider />
              </BookingFormProvider>
            </ModalStateProvider>
          </AppSettingsProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
