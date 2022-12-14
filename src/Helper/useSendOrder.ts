import { doc, setDoc } from "firebase/firestore";

import db from "./firebaseconfig";

export default function useSendOrder() {
  const sendOrder = async (orderDetails: OrderDetails) => {
    try {
      await setDoc(doc(db, "orders", orderDetails.orderId), {
        ...orderDetails,
      });
    } catch (error) {}
  };

  return sendOrder;
}
