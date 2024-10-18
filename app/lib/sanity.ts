import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const portalClient = createClient({
  projectId: '5ra6buqx',
  dataset: 'production',
  apiVersion: '2023-06-29',
  useCdn: true,
  token: process.env.SANITY_TOKEN_PORTAL
})

export const landingClient = createClient({
  projectId: '1wu9ea3w',
  useCdn: true,
  dataset: "production",
  apiVersion: '2024-02-01',
  token: process.env.SANITY_TOKEN_LANDING
})

const builder = imageUrlBuilder(portalClient)

export const urlFor = (source: string) => builder.image(source)