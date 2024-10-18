"use client";
import React, { useRef, useEffect, ReactNode } from "react";

interface PortalPageClientProps {
  children: ReactNode;
}

const PortalPageClient: React.FC<PortalPageClientProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  return <div ref={containerRef} className="container flex-[0.95]">{children}</div>;
};

export default PortalPageClient;