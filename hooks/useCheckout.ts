import axios from "axios"

export const useCheckout = () => {
  const createPaypalOrder = async (amount: number) => {
    const response = await axios.post('/api/checkout/paypal/create-paypal-order', { amount })
  
    return response.data
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