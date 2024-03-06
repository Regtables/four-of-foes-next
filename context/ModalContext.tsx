'use client'

import React, { createContext, useState, useContext, ReactNode } from "react";

type ModalType = "login" | "alert" | "loading" | null;

interface AlertProps {
  confirm: string;
  handleConfirm: () => void;
  option: string;
  handleOption: () => void; // Corrected the type here
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
  };
  handleModalOpen: (type: ModalType, modalData?: any) => void;
  handleModalClose: (typeToClose?: ModalType) => void;
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
};

const defaultValues: ModalContextProps = {
  isOpen: false,
  types: [],
  data: defaultModalData,
  handleModalOpen: (type, modalData) => {},
  handleModalClose: (typeToClose) => {},
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
    alert: { ...defaultModalData.alert }, // Create a new object to avoid mutations
  });

  const handleModalOpen = (type: ModalType, modalData?: any) => {
    console.log('opening modal')
    setIsOpen(true);
    setTypes((prevTypes) => [...prevTypes, type]);

    if (modalData) {
      setData({ ...data, ...modalData });
    }
  };

  const handleModalClose = (typeToClose?: ModalType) => {
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

  return (
    <ModalContext.Provider
      value={{ isOpen, types, data, handleModalClose, handleModalOpen }}
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

