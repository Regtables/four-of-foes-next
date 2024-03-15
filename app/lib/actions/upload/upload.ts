'use server'

import { NextResponse } from "next/server"

export const uploadImage = async (client, formData) => {
  try{
    console.log(formData)

    return NextResponse.json('Image uploaded', { status: 200 })
  } catch (error){
    console.log(error, 'error')

    return NextResponse.json('Error when uploading image', { status: 500 })
  }
}