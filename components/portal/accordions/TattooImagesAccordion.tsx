import React, { useState } from 'react'
import Slider from 'react-slick'
import JSZip from "jszip";

import { cn } from '@/app/lib/utils';
import { useModal } from '@/hooks/useModal';
import { urlFor } from '@/app/lib/sanity';

import AccordionLayout from '../layout/AccordionLayout'
import ImageTile from '@/components/images/ImageTile'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const TattooImagesAccordion = ({ images } : { images: any[] }) => {
  const [index, setIndex] = useState(0)
  const { handleOpen, handleClose } = useModal()

  const settings = {
    infinite: true,
    // speed: 1000,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    focusOnSelect: true,
    lazyLoading: true,

    beforeChange: (current: number, next: number) => setIndex(next),
  };

  const handleDownload = async () => {
    handleOpen('loading')

    const paths = images.map((image: any) => {
      return urlFor(image).url()
    })

    const zip = new JSZip();

    await Promise.all(
      paths.map(async (path: any, i: number) => {
        const imageData = await fetch(path);
        const image = await imageData.arrayBuffer();
        const fileName = `photo${i + 1}.jpg`;

        zip.file(fileName, image);
      })
    );

    const zipBlob = await zip.generateAsync({ type: "blob" });

    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "photos.zip";
    link.click();
    URL.revokeObjectURL(url);

    handleClose('loading')
  };

  const handleImageClick = (i: number, image: any) => {
    if(i === index){
      handleOpen('imagePreview', { activeImage: image })
    }
  }

  return (
    <AccordionLayout title = 'your photos' section={2} list>
      <div className='w-[80vw] lg:w-[60vw] relative'>
        <Slider {...settings} className='mt-10'>
          {images.map((image, i) => (
            <div 
              className={cn('h-[350px] min-w-[150px] relative p-4 lg:p-0 rounded-lg transition-all duration-300 opacity-70 translate-x-[-25px] lg:translate-x-0',
                index === i
                ? 'min-w-[200px] translate-x-[-50px] lg:translate-x-0 z-10 opacity-100 shadow-[0 25px 50px -12px rgb(0 0 0 / 1)]'
                : 'scale-75 lg:scale-80 z-0',
                i === index - 1 && 'lg:translate-x-[70px]',
                i === index + 1 && 'lg:translate-x-[-70px]',
                i === index + 3 && 'lg:translate-x-[70px]',
                i === index - 3 && 'lg:translate-x-[-70px]'
              )}
              onClick={() => handleImageClick(i, image)}
            >
              <ImageTile image={image} />
            </div>
          ))}
        </Slider>

        <button className='text-center w-full cursor-pointer text-[8px] uppercase tracking-[0.4em] text-[#a9a9a9] absolute bottom-2' onClick={handleDownload}>download</button>
      </div>
    </AccordionLayout>
  )
}

export default TattooImagesAccordion