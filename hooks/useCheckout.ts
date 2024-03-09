import { useModal } from "@/context/ModalContext"
import axios from "axios"

export const useCheckout = () => {
  const { handleModalOpen, handleModalClose} = useModal()
  
  const createPaypalOrder = async (amount: number) => {
    try{
      handleModalOpen('loading')
      const response = await axios.post('/api/checkout/paypal/create-paypal-order', { amount })
    
      return response.data

    } catch (error){
      console.log(error)

      handleModalOpen('alert', { alert: {
        title: "Payment Error",
        content: 'There was an issue when trying to process your payment, please try again',
        confirm: 'okay',
        handleConfirm: () => handleModalClose('alert')
      }})
    } finally {
      handleModalClose('loading')
    }
  }

  const capturePaypalPayment = async (orderId: string) => {
    const response = await axios.post('/api/checkout/paypal/capture-paypal-payment', { orderId })


    return response.data
  }

  const handlePortalPayment = async (orderId: string, installment: string) => {
    try {
      const res = await axios.post(`/api/portal/${installment}`, { orderId });

      console.log(res);

      if (res.data.status === "COMPLETED") {
        // dispatch(setProgressItem({ key: "isDepositConfirmed", value: true }));
        // setPaymentSucess(true);
      }

      return res.data;
    } catch (error: any) {
      if (error.response.status === 401) {
      }
    }
  };

  return { createPaypalOrder, capturePaypalPayment, handlePortalPayment }
}