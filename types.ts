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
  _id: string,
  content: string,
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