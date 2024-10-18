import { Message } from "@/types";

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result as string;
      const base64 = base64Data!.split(",")[1]
      resolve(base64);
    };

    reader.onerror = (error) => reject(error);
  });
}

export const filterUnreadMessages = (messageHistory: Message[], isAdmin: boolean) => {
  return messageHistory?.filter(
    (chat) =>
      isAdmin 
      ? chat?.readBy?.includes("client") && !chat?.readBy.includes("admin")
      : chat?.readBy?.includes('admin') && !chat?.readBy.includes('client')
  );
} 