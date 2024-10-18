import type { Metadata } from "next";
import { jost } from "./lib/fonts";
import "./globals.css";
import { ModalProvider as ModalStateProvider } from "@/context/ModalContext";
import { BookingFormProvider } from "@/context/BookingFormContext";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import ModalProvider from "@/components/providers/ModalProvider";
import { ClerkProvider } from "@clerk/nextjs";

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
