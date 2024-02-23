import ImageCarousel from "@/components/images/ImageCarousel";
import { ShopType } from "@/types";
import { link } from "fs";
import { Instagram, MapPin } from "lucide-react";
import React from "react";

const ShopProfile = ({ shop }: { shop: ShopType }) => {
  const { name, logo, instagram, location, images } = shop;

  const linkStyles = 'flex items-center gap-2 tracking-[0.3em] text-[10px] font-light'

  return (
    <div className="w-sreen mt-10">
      <div className="uppercase tracking-[0.3em] font-[600] text-center">{name}</div>

      <div className="mt-8 flex flex-col gap-6 w-[80vw] mx-auto">
        <a href={instagram.link} className={linkStyles} target="_blank" rel = 'noreferrer'>
          <Instagram size={15}/>
          {instagram.handle}
        </a>

        <a href={location.link} className= {linkStyles} target= "_blank" rel = 'no referrer'>
          <MapPin size = {25}/>
          {location.address}
        </a>
      </div>

      <div className="w-screen h-[230px] mt-16">
        <ImageCarousel images={images} />
      </div>
    </div>
  );
};

export default ShopProfile;
