import React, { useState, useEffect } from "react";
import Image from "next/image";
import Compressor from "compressorjs";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

import { useModal } from "@/hooks/useModal";

import ButtonPill from "../buttons/ButtonPill";

const Upload = ({
  selectedFile,
  setSelectedFile,
}: {
  selectedFile: File;
  setSelectedFile: any;
}) => {
  const [image, setImage] = useState<any>();
  const [toggleAlert, setToggleAlert] = useState({
    title: "",
    text: "",
    confrim: "",
    option: "",
    toggle: false,
  });

  const { handleOpen, handleAlertClose, handleClose } = useModal()

  useEffect(() => {
    if (selectedFile === null) {
      setImage(null);
    } else if(selectedFile){
      setImage(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);

  const handleUpload = (e: any) => {
    const uploadedImage = e.target.files[0];

    if (
      uploadedImage.type === "image/jpeg" ||
      uploadedImage.type === "image/png" ||
      uploadedImage.type === "image/webp"
    ) {
      new Compressor(uploadedImage, {
        quality: 0.1,
        success: (result) => {
          if (e.target.files && result) {
            if (result.size < 20000000) {
              setImage(URL.createObjectURL(uploadedImage));
              setSelectedFile(result);
            } else {
              console.log('too big')
              setToggleAlert({ ...toggleAlert,
                toggle: true,
                title: "Exceeded Maximum Image Size",
                text: "You have uploaded an image that is too large. Please make sure the size of your image is under 1.5mb.",
                confrim: 'okay'
              });
            }
          }
        },
      });
    } else {
      handleOpen('alert', { alertData: {
        title: 'File type not supported',
        content: 'Your uploaded files are unfortunately not supported. Please ensure to use jpeg or webp',
        confirm: 'okay',
        handleConfirm: () => handleClose('alert')
      }})
    }
  };

  const handleClear = () => {
    setImage(null);
    setSelectedFile(null);
  };

  return (
    <>
      {!image ? (
        <motion.label
          className='border-2 border-dashed border-white h-[150px] lg:min-h-[250px] rounded-md flex items-center justify-center cursor-pointer'
          whileInView={{ y: [5, 0], opacity: [0, 1] }}
          transition={{ duration: 1 }}
        >
          <input type="file" onChange={(e) => handleUpload(e)} className="w-0 h-0" />

          <UploadCloud />
        </motion.label>
      ) : (
        <motion.div
          className='h-[150px] lg:min-h-[250px] rounded-md relative flex justify-center'
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.3 }}
        >
          <div className='relative w-full h-full'>
            <Image src={image} alt="Client Reference Image" fill className="object-cover rounded-md"/>
          </div>
          <div className= 'absolute bottom-4 h-[20px] w-[70px]' onClick={handleClear}>
            <ButtonPill text="clear" fill/>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Upload;
