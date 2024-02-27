import type { Metadata } from "next";
import { jost } from "./lib/fonts";
import "./globals.css";

import { BookingFormProvider } from "@/context/BookingFormContext";
import { AppSettingsProvider } from "@/context/AppSettingsContext";

import ModalProvider from "@/components/providers/ModalProvider";

export const metadata: Metadata = {
  title: "Four of Foes - Home",
  description: "Creative atelier & tattoo collective.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </head>
      
      <body className={jost.className}>
        <AppSettingsProvider>
          <BookingFormProvider>
            {children}
            <ModalProvider />
          </BookingFormProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
