'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Triangle } from 'react-loader-spinner'

const UrlDecodePage = ({ params } : { params: any }) => {
  const { url } = params
  const router = useRouter()

  const encoded = url
  const decoded = Buffer.from(`${encoded}` as string, "base64").toString();

  useEffect(() => {
    if (decoded) {
      if (decoded.includes("portal")) {
        router.push(decoded)
      }
    }
  }, [decoded]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Triangle
        visible={true}
        height="40"
        width="40"
        color="white"
        ariaLabel="triangle-loading"
      />
    </div>
  );
}

export default UrlDecodePage