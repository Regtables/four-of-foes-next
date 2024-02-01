import { BookingSection, IndemnityType } from "@/types";
import { create } from "zustand";

export type ModalType = 'indemnity' | 'calendar' | 'location' | 'prep' | 'appointmentActions' | 'aftercare' | 'photos' | 'review' | 'booking'

interface ModalData {
  indemnity?: IndemnityType[]
  tips?: string[],
  bookingFormData?: BookingSection[]
}

interface ModalStore {
  type: ModalType | null,
  data?: ModalData | null,
  isOpen: boolean,
  handleOpen: (type: ModalType, data?: ModalData) => void,
  handleClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {} || [],
  isOpen: false,
  handleOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  handleClose: () => set({ isOpen: false, type: null })
}))