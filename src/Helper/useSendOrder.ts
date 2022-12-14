import { doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";

import db from "./firebaseconfig";

export default function useSendOrder() {
  const sendOrder = async (orderDetails: OrderDetails) => {
    const orderId = uuid();
    try {
      await setDoc(doc(db, "orders", orderId), {
        ...orderDetails,
      });
    } catch (error) {}
  };

  return sendOrder;
}
