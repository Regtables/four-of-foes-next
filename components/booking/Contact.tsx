import { cn } from "@/app/lib/utils";
import { Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PageHeading from "../headings/PageHeading";
import ViewMotionWrapper from "../layout/Motion/ViewMotionWrapper";

const Contact = ({ page }: { page?: boolean }) => {
  return (
    <div
      className={cn(
        "lg:pb-[150px] h-[72vh] lg:h-[76vh] flex flex-col gap-16 items-center overflow-hidden mt-14",
        page && "h-full flex flex-col items-center pb-0 lg:mt-16 overflow-hidden"
      )}
    >
      <ViewMotionWrapper
        duration={1.5}
        className={cn(
          "relative h-[180px] w-[90px] lg:h-[220px] lg:w-[90px] lg:mx-auto ml-3",
          page && "lg:min-h-[300px] w-[140px] min-h-[240px] lg:w-[140px] mt-20 lg:mt-0"
        )}
      >
        <Image
          src={page ? "/contact-bg.png" : "/rose.png"}
          fill
          alt="rose"
          className="object-cover lg:ml-2"
          priority = {true}
        />
      </ViewMotionWrapper>

      <div className={cn("flex flex-col items-center gap-2 mt-4", page && 'mt-[85px] lg:mt-0')}>
        <div className="flex items-center gap-2 tracking-[0.3em] font-light text-[10px]">
          <Instagram size={15} />
          @paradyme.ttt
        </div>

        <div className="flex items-center gap-2 tracking-[0.3em] font-light text-[10px]">
          <Mail size={15} />
          hello@exnihilo.com
        </div>

        <Link
          href="/privacy-policy"
          className="flex items-center gap-2 tracking-[0.3em] font-light text-[10px] underline"
        >
          privacy policy
        </Link>

        <p className="tracking-[0.3em] font-light text-[10px] mt-4">
          © 2025 by Exnihilo
        </p>
      </div>
    </div>
  );
};

export default Contact;
