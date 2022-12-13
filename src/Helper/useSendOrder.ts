import { doc, setDoc } from "firebase/firestore";

import db from "./firebaseconfig";

export default function useSendOrder() {

  const sendOrder = async (orderDetails: OrderDetails) => {

    try {
      await setDoc(doc(db, "orders", "sd"), {
        orderDetails,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return sendOrder;
}
