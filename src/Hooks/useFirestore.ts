import { doc, setDoc } from "firebase/firestore";

import db from "../Firebase/firebaseconfig";

export default function useFirestore() {
  const sendOrder = async ({ orderDetails, type }: { orderDetails: OrderDetails; type: string }) => {
    if (type === "send") {
      try {
        await setDoc(doc(db, "orders", orderDetails.orderId), {
          ...orderDetails,
        });
      } catch (error) {}
    }
  };

  return sendOrder;
}
