import { createClient } from "@sanity/client";

export const portalClient = createClient({
  projectId: '5ra6buqx',
  useCdn: true,
  dataset: 'production',
  apiVersion: '2023-12-09',
  token: process.env.SANITY_TOKEN_PORTAL
})

export const landingClient = createClient({
  projectId: '1wu9ea3w',
  useCdn: true,
  dataset: "production",
  apiVersion: '2024-02-01',
  token: process.env.SANITY_TOKEN_LANDING
})