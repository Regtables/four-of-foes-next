import React from "react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { AnimatePresence, motion } from "framer-motion";

import { useModal } from "@/context/ModalContext";
import { portalClient } from "@/app/lib/sanity";

import Popup from "../layout/Popup";

const ImagePreviewModal = () => {
  const { isOpen, types, handleModalClose, data } = useModal();
  if (!data?.activeImage) return null;
  const { src, loader }: any = useNextSanityImage(
    portalClient,
    data?.activeImage
  );

  const isModalOpen = isOpen && types?.includes("imagePreview");

  return (
    <AnimatePresence>
      {data?.activeImage && (
        <Popup isOpen={isModalOpen!} fade>
          <div className="flex relative lg:h-[80vh] lg:w-[60vw] h-[70vh] w-[85vw] m-auto">
            <Image
              src={src}
              loader={loader}
              fill
              alt="A photo of your tattoo"
              className="object-cover rounded-2xl"
            />
          </div>

          <motion.div
            onClick={() => handleModalClose("imagePreview")}
            className="absolute bottom-5 title"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 1 }}
            exit={{ y: [0, 20] }}
          >
            close
          </motion.div>
        </Popup>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;
