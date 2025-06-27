import React from "react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Exnihilo - Contact",
  description: "Get in touch with us",
};

const ContactPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ContactPageLayout;
