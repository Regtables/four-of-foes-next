import React from 'react'

import AccordionLayout from '../layout/AccordionLayout'
import PortalImageCarousel from '../PortalImageCarousel';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TattooImagesAccordion = ({ images } : { images: any[] }) => {
  return (
    <AccordionLayout title = 'your photos' section={2} list>
      <PortalImageCarousel images={images} />
    </AccordionLayout>
  )
}

export default TattooImagesAccordion