import { SanityClient, createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const portalClient: SanityClient = createClient({
  projectId: '5ra6buqx',
  dataset: 'production',
  apiVersion: '2023-06-29',
  useCdn: false,
  // token: process.env.SANITY_PORTAL_TOKEN
  token: 'skhX0E5yTMC80Y5itNUiqfnE0LOMGXcAT7EOsZphYhKFHhMH9MkR0cz4fIYqsPMr9FTyUHaiyroiq86xFTABNEHTUV9ZHj7d7DxCDnNZ1GCE2sgncghIKgSJBFLKaGCXMUWWiEJPYXUzXLdVSSqYbFahqMjZcytExeGT9Xy6SdjtF78XfuBA'
 
})

export const landingClient = createClient({
  projectId: '1wu9ea3w',
  useCdn: false,
  dataset: "production",
  apiVersion: '2024-02-01',
  token: process.env.SANITY_TOKEN_LANDING
})

const builder = imageUrlBuilder(portalClient)

export const urlFor = (source: string) => builder.image(source)