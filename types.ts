export interface InforationType {
  name: string,
  required: boolean,
  placeholder: string
}

export interface Choice {
  name: string,
  value: string,
  title: string
}

export interface Value {
  choice: {
    name: string;
    title: string;
    value: string;
  }
}

export interface Section {
  heading: string;
  description: string;
  options?: Value[];
}

export interface ClientType{
  clientName: string,
  email: string,
  tattooPrice: number,
  sanityId: string,
  clientUrl: string,
  appointmentDetails: {
    appointmentDate: string,
    appointmentLocation: string,
    appointmentCity: string
  }
  chat: MessageType[]
  progress: any
}

export interface PortalNavLinkType{
  page: string,
  slug: string,
}

export interface PortalPageHeadingType{
  heading: string,
}

export interface AppointmentDetailsType {
  clientName: string,
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
  message: string,
  from: string,
  date: Date,
  isClient: boolean,
  image?: any,
  live?: boolean
}

export interface RatingType {
  rating: string,
  icon: any,
  portion: number
}