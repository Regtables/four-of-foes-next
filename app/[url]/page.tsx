'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const UrlDecodePage = ({ params } : { params: any }) => {
  const { url } = params
  const router = useRouter()

  console.log(url)
  const encoded = url
  const decoded = Buffer.from(`${encoded}` as string, "base64").toString();

  useEffect(() => {
    if (decoded) {
      if (decoded.includes("portal")) {
        router.push(decoded)
      }
    }
  }, [decoded]);

  console.log(decoded)
  return (
    <div>UrlDecodePage</div>
  )
}

export default UrlDecodePage