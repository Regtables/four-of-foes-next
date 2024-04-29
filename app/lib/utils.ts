import { ClientType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const smoothScroll = (target: string) => {
  const element = document.getElementById(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const testClient: ClientType = {
  _type: "client",
  clientName: "Jane Doe",
  email: "johndoe@example.com",
  tattooPrice: 1000,
  sanityId: "abc123",
  clientUrl: "https://example.com/client/abc123",
  _id: "abc123",
  appointmentDetails: {
    appointmentDate: new Date("2024-05-10T14:00:00.000Z"),
    appointmentLocation: "Tattoo Studio",
    appointmentCity: "New York",
  },
  deposit: { depositAmount: 200 },
  payment: { paymentAmount: 800 },
  chat: [],
  progress: {
    isPaymentConfirmed: true,
    isIndemnitySigned: false,
    isDepositConfirmed: true,
    isTattooCompleted: false,
    isReviewSubmitted: false,
    isAppliedForResheudle: false,
    resheduleDate: "",
    isAppliedForCancelation: false,
  },
  review: {
    review: "",
    rating: 0,
  },
  tattooImages: [
    {
      _type: "image",
      _key: "image1",
      asset: { url: "https://example.com/image1.jpg" },
    },
    {
      _type: "image",
      _key: "image2",
      asset: { url: "https://example.com/image2.jpg" },
    },
    {
      _type: "image",
      _key: "image3",
      asset: { url: "https://example.com/image3.jpg" },
    },
  ],
  clientIndemnity: {
    captureDate: null,
    clientName: "John Doe",
    agreedMainClauses: [
      {
        heading: "Clause 1",
        clause: "Main Clause 1",
        consentGiven: false,
        dateCaptured: new Date(),
        id: "clause1",
      },
      {
        heading: "Clause 2",
        clause: "Main Clause 2",
        consentGiven: false,
        dateCaptured: new Date(),
        id: "clause2",
      },
      {
        heading: "Clause 3",
        clause: "Main Clause 3",
        consentGiven: false,
        dateCaptured: new Date(),
        id: "clause3",
      },
      {
        heading: "Clause 4",
        clause: "Main Clause 4",
        consentGiven: false,
        dateCaptured: new Date(),
        id: "clause4",
      },
      {
        heading: "Clause 5",
        clause: "Main Clause 5",
        consentGiven: false,
        dateCaptured: new Date(),
        id: "clause5",
      },
    ],
    agreedIndividualClauses: [
      {
        clause: "Individual Clause 1",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 2",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 3",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 4",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 5",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 6",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 7",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 8",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 9",
        consentGiven: false,
        dateCaptured: new Date(),
      },
      {
        clause: "Individual Clause 10",
        consentGiven: false,
        dateCaptured: new Date(),
      },
    ],
  },
};
