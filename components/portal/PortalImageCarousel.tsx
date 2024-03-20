import React, { Fragment, useState } from 'react'
import Slider from 'react-slick'
import JSZip from "jszip";

import { cn } from '@/app/lib/utils';
import { useModal } from '@/context/ModalContext';
import { urlFor } from '@/app/lib/sanity';

import ImageTile from '@/components/images/ImageTile'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PortalImageCarousel:React.FC<{images: any[]}> = ({ images }) => {
  const [index, setIndex] = useState(0)
  const { handleModalOpen, handleModalClose, handleActionErrorAlertOpen } = useModal()

  const settings = {
    infinite: true,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    focusOnSelect: true,
    lazyLoading: true,

    beforeChange: (current: number, next: number) => setIndex(next),
  };

  const handleDownload = async () => {
    try{
      handleModalOpen('loading')
  
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
    } catch (error){
      console.log(error)
      handleActionErrorAlertOpen('to download your tattoo photos')
    } finally {
      handleModalClose('loading')
    }
  };

  const handleImageClick = (i: number, image: any) => {
    if(i === index){
      handleModalOpen('imagePreview', { activeImage: image })
    }
  }

  return (
    <div className='w-[80vw] lg:w-[60vw] relative'>
    {images.length !== 0 || undefined ? (
      <Fragment>
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
              key={i}
            >
              <ImageTile image={image} />
            </div>
          ))}
        </Slider>

        <button className='text-center w-full cursor-pointer text-[8px] uppercase tracking-[0.4em] text-[#a9a9a9] absolute bottom-2' onClick={handleDownload}>download</button>
      </Fragment>
    ) : (
      <div className='flex lg:w-[70%] w-[90%] leading-4 h-full items-center justify-center mx-auto'>
        <p className='title text-center'>We have not uploaded your photos yet, check back in a little while, or when notified</p>
      </div>
    )}
  </div>
  )
}

export default PortalImageCarousel