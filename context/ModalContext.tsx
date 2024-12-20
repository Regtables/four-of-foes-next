"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type ModalType = "login" | "alert" | "loading" | "imagePreview" | "bookingError" | "success" | null;

interface AlertProps {
  confirm: string;
  handleConfirm: () => void;
  option: string;
  handleOption: () => void;
  title: string;
  content: string;
  alert: boolean;
}

interface ModalContextProps {
  isOpen: boolean;
  types: ModalType[];
  data: {
    activationUrl?: string;
    alert?: AlertProps;
    activeImage?: any;
  };
  handleModalOpen: (type: ModalType, modalData?: any) => void;
  handleModalClose: (typeToClose?: ModalType) => void;
  handleActionErrorAlertOpen: (action: string) => void;
}

const defaultModalData = {
  activationUrl: "",
  alert: {
    confirm: "",
    handleConfirm: () => {},
    option: "",
    handleOption: () => {},
    title: "",
    content: "",
    alert: false,
  },
  activeImage: "",
};

const defaultValues: ModalContextProps = {
  isOpen: false,
  types: [],
  data: defaultModalData,
  handleModalOpen: (type, modalData) => {},
  handleModalClose: (typeToClose) => {},
  handleActionErrorAlertOpen: (action) => {},
};

const ModalContext = createContext(defaultValues);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [types, setTypes] = useState<ModalType[]>([]);
  const [data, setData] = useState({
    activationUrl: "",
    alert: { ...defaultModalData.alert },
  });

  const handleModalOpen = (type: ModalType, modalData?: any) => {
    console.log("opening modal");
    setIsOpen(true);
    setTypes((prevTypes) => [...prevTypes, type]);
    console.log(types)

    if (modalData) {
      setData({ ...data, ...modalData });
    }
  };

  const handleModalClose = (typeToClose?: ModalType) => {
    console.log(data);
    const newTypes = types.filter((type) => type !== typeToClose);
    setTypes(newTypes);
    setData(defaultModalData);

    if (newTypes.length === 0) {
      setIsOpen(false);
    }

    if (!typeToClose) {
      setTypes([]);
      setData(defaultModalData);
      setIsOpen(false);
    }
  };

  const handleActionErrorAlertOpen = (action: string) => {
    handleModalOpen("alert", {
      alert: {
        title: "Oops!",
        content: `Something went wrong when ${action}, please try again`,
        confirm: "Okay",
        handleConfirm: () => handleModalClose("alert"),
      },
    });
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        types,
        data,
        handleModalClose,
        handleModalOpen,
        handleActionErrorAlertOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
