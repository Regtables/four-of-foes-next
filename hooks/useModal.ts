import { AlertType, BookingSection, IndemnityType } from "@/types";
import { create } from "zustand";

export type ModalType =
  | "indemnity"
  | "calendar"
  | "location"
  | "prep"
  | "appointmentActions"
  | "aftercare"
  | "photos"
  | "feedback"
  | "booking"
  | "loading"
  | "alert"
  | "success"

interface ModalData {
  indemnity?: IndemnityType[];
  tips?: string[];
  bookingFormData?: BookingSection[];
  alertData?: AlertType;
}

interface ModalStore {
  types: ModalType[] | null;
  data?: ModalData | null;
  isOpen: boolean;
  handleOpen: (type: ModalType, data?: ModalData) => void;
  handleClose: (type?: ModalType, data?: ModalData) => void;
  handleAlertClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  types: null,
  data: {},
  isOpen: false,
  handleOpen: (type, data) =>
    set((state) => ({
      data: { ...data, ...state.data },
      isOpen: true,
      types: state.types ? [...state.types, type] : [type],
    })),
  handleClose: (type, data) =>
    set((state) => ({
      isOpen: state.types?.length === 1 ? false : true,
      types: type ? state.types?.filter((t) => t !== type) : null,
      data: { ...state.data, ...data },
    })),
  handleAlertClose: () =>
    set((state) => ({
      types: state.types?.filter((t) => t !== "alert"),
      data: {
        ...state.data,
        alertData: {
          title: "",
          content: "",
          confirm: "",
          handleConfirm: () => {},
        },
      },
    })),
}));

console.log(useModal.getState())
