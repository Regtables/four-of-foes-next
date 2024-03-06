import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { jost } from "./lib/fonts";
import "./globals.css";
import { ModalProvider as ModalStateProvider } from "@/context/ModalContext";
import { BookingFormProvider } from "@/context/BookingFormContext";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import ModalProvider from "@/components/providers/ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Four of Foes",
  description: "The coolest tattoo website ever made",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />

      <body className={jost.className}>
        <AppSettingsProvider>
          <ModalStateProvider>
            <BookingFormProvider>
              {children}
              <ModalProvider />
            </BookingFormProvider>
          </ModalStateProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
