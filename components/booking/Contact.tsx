import { cn } from "@/app/lib/utils";
import { Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PageHeading from "../headings/PageHeading";

const Contact = ({ page }: { page?: boolean }) => {
  return (
    <div
      className={cn(
        "lg:pb-[170px] h-[72vh] lg:h-[76vh] flex flex-col gap-20 items-center overflow-hidden",
        page && "h-full flex flex-col items-center pb-0 lg:mt-10"
      )}
    >
      <div
        className={cn(
          "relative h-[180px] w-[450px] lg:h-[300px] lg:w-[400px] lg:mx-auto ml-3",
          page && "lg:h-[500px] lg:w-[400px] mt-20 lg:mt-0"
        )}
      >
        <Image
          src="/rose.png"
          fill
          alt="rose"
          className="object-cover lg:ml-2"
        />
      </div>

      <div className={cn("flex flex-col items-center gap-2 mt-4", page && 'mt-[150px] lg:mt-0')}>
        <div className="flex items-center gap-2 tracking-[0.3em] font-light text-[10px]">
          <Instagram size={15} />
          @fourofoes
        </div>

        <div className="flex items-center gap-2 tracking-[0.3em] font-light text-[10px]">
          <Mail size={15} />
          info@fourofoes.com
        </div>

        <Link
          href="/privacy-policy"
          className="flex items-center gap-2 tracking-[0.3em] font-light text-[10px] underline"
        >
          privacy policy
        </Link>

        <p className="tracking-[0.3em] font-light text-[10px] mt-4">
          © 2024 by Four of Foes
        </p>
      </div>
    </div>
  );
};

export default Contact;
