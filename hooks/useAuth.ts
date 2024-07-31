import axios from "axios";
import { useRouter } from "next/navigation";

import { usePortalProgress } from "@/context/PortalProgressContext";
import { useModal } from "@/context/ModalContext";
import { ClientType } from "@/types";

export const useAuth = () => {
  const router = useRouter();
  const { handleModalClose, handleModalOpen } = useModal();
  const { clearProgress, setProgress, progress } = usePortalProgress();

  const signInClient = async (client: ClientType) => {
    try {
      handleModalOpen("loading");
      const res = await axios.post("/api/clients/auth", { client });

      if (res.status === 200) {
        setProgress(client.progress);
        router.push("/portal/pre");
        console.log(progress);
      } else {
        throw new Error("Authenticaion Failed");
      }
    } catch (error) {
      console.log(`Unable to sign client in: ${error}`);

      handleModalOpen("alert", {
        alert: {
          title: "Sign In Error",
          content:
            "There was an issue when trying to authenticate your account, please try again.",
          confirm: "Okay",
          handleConfirm: () => handleModalClose("alert"),
        },
      });
      throw error;
    } finally {
      handleModalClose("loading");
    }
  };

  const logoutClient = async () => {
    try {
      handleModalOpen("loading");
      const res = await axios.get("/api/clients/auth/logout");

      if (res.status === 200) {
        clearProgress();
        router.push("/");
      } else {
        throw new Error("Authenticaion Failed");
      }
    } catch (error) {
      console.log(`Unable to logout client: ${error}`);

      handleModalOpen("alert", {
        alert: {
          title: "Sign Out Error",
          content:
            "There was an issue when trying end your session, please try again",
          confirm: "Okay",
          handleConfirm: () => handleModalClose("alert"),
        },
      });

      throw error;
    } finally {
      handleModalClose("loading");
    }
  };

  const refreshClientSession = async () => {
    try {
      handleModalOpen("loading");
      const res = await axios.get("/api/clients/auth/refresh", {
        withCredentials: true,
      });

      if (res.status === 200) {
        router.push("/portal/pre");
      } else {
        throw new Error("Authenticaion Failed");
      }
    } catch (error) {
      console.log(`Unable to refresh client's session: ${error}`);

      handleModalOpen("alert", {
        alert: {
          title: "Session Refresh Error",
          content:
            "There was an issue when trying to refresh your session, please try again.",
          confirm: "Okay",
          handleConfirm: () => handleModalClose("alert"),
        },
      });

      throw error;
    } finally {
      handleModalClose("loading");
    }
  };

  const createAndSendVerificationCode = async (clientId: string) => {
    try {
      const res = await axios.get(`/api/clients/auth/verification/${clientId}`);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyCode = async (client: ClientType, verifcationCode: string) => {
    try {
      handleModalOpen("loading");
      const res = await axios.post(
        `/api/clients/auth/verification/${client._id}`,
        { code: verifcationCode }
      );

      if (res.status === 200) {
        handleModalClose('loading')
        await signInClient(client);
      }
    } catch (error: any) {
      handleModalClose('loading')
      console.log(error);

      if (error.response.status === 400) {
        handleModalOpen("alert", {
          alert: {
            title: "Verification Error",
            content: `The code you entered did not match the one we sent to your email. Please try again`,
            confirm: "Okay",
            handleConfirm: () => handleModalClose("alert"),
          },
        });
      }
    } finally {
      // handleModalClose("loading");
    }
  };

  return {
    logoutClient,
    refreshClientSession,
    signInClient,
    createAndSendVerificationCode,
    verifyCode,
  };
};