import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";

import db from "../Firebase/firebaseconfig";

interface SendOrder {
  orderDetails: OrderDetails;
  type: "send";
}

interface FireToggle {
  orderID: string;
  itemID: string;
  ingredientID: string;
  type: "toggle";
}

type Firestore = SendOrder | FireToggle;

export default function useFirestore() {
  const openOrders = useAppSelector((state) => state.openOrders);

  // console.log("oor", openOrders);

  const sendFirestore = async (input: Firestore) => {
    if (input.type === "send") {
      try {
        await setDoc(doc(db, "orders", input.orderDetails.orderId), {
          ...input.orderDetails,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (input.type === "toggle") {
      const order = openOrders.find((order) => order.orderId === input.orderID);

      // console.log("or", order);
      try {
        const docRef = doc(db, "orders", input.orderID);
        console.log("he");
        if (order !== undefined) {
          await updateDoc(docRef, { ...order });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return sendFirestore;
}
