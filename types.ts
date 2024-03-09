export interface InforationType {
  name: string,
  required: boolean,
  placeholder: string
}

export interface CheckboxOption {
  name: string,
  value: string,
  title: string
}

export interface LoungeLinkType {
  link: string,
  type: 'indemnity' | 'prep' | 'location' | 'aftercare' | 'photos' | 'feedback', 
  data: IndemnityType[] | string[] | any
}

export interface Value {
  choice: {
    name: string;
    title: string;
    value: string;
  }
}

export interface BookingSection {
  heading: string;
  description: string;
  options?: Value[];
}

export interface ClientType{
  _type: string,
  clientName: string,
  email: string,
  tattooPrice: number,
  sanityId: string,
  clientUrl: string,
  _id: string
  appointmentDetails: AppointmentDetailsType
  deposit: {
    depositAmount: number
  },
  payment: {
    paymentAmount: number
  }
  chat: MessageType[]
  progress: PortalProgressType
  review: {
    review: string,
    rating: number
  }
  tattooImages: any[],
  clientIndemnity: ClientIndemnityType
}

export interface PortalNavLinkType{
  page: string,
  slug: string,
}

export interface PortalPageHeadingType{
  heading: string,
}

export interface AppointmentDetailsType {
  // clientName: string,
  appointmentDate: Date,
  appointmentLocation: string,
  appointmentCity: string
}

export interface DepositDataType {
  depositAmount: number
}

export interface IndemnityType{
  heading: string,
  clause: string,
  consentGiven: boolean,
  dateCaptured: Date,
  id: string
}

export interface MiniIndemnityClauseType{
  clause: string,
  consentGiven: boolean,
  dateCaptured: Date
}

export interface AftercareType{
  heading: string,
  content: string
}

export interface MessageType{
  _id: string,
  message: string,
  sender: string,
  date: Date,
  isClient?: boolean,
  isImage?: any,
  isDeleted?: boolean,
  isRead?: boolean
  live?: boolean
}

export interface RatingType {
  rating: string,
  icon: any,
  portion: number
}

export interface AlertType {
  title: string,
  content: string,
  confirm: string,
  handleConfirm: () => void,
  option?: string,
  handleOption?: () => void,
  signature?: boolean
}

export interface ShopType {
  name: string,
  logo: any,
  instagram: {
    handle: string,
    link: string
  },
  location: {
    address: string,
    link: string
  },
  images: any[]
}

export interface SessionType {
  user: {
    name: string,
    email: string,
    id: string,
    isAppointmentCompleted: boolean
  },
  expires: Date
} 

export interface PortalProgressType {
  isDepositConfirmed: boolean,
  isPaymentConfirmed: boolean,
  isReviewSubmitted: boolean,
  isIndemnitySigned: boolean,
  isTattooCompleted: boolean,
  isAppliedForResheudle: boolean,
  resheduleDate: string,
  isAppliedForCancelation: boolean
}

export interface ClientIndemnityType {
  captureDate: Date | string,
  clientName: string,
  agreedMainClauses: IndemnityType[],
  agreedIndividualClauses: MiniIndemnityClauseType[]
}