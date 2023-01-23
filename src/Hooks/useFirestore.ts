import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";

import db from "../Firebase/firebaseconfig";

interface FireSendOrder {
  orderDetails: OrderDetails;
  type: "send";
}

interface FireToggle extends Toggle {
  type: "toggle";
}

interface FireAddIngredient extends AddIngredient {
  type: "addIngredient";
}

interface FireRemoveItem extends Remove {
  type: "removeItem";
}

type Firestore = FireSendOrder | FireToggle | FireAddIngredient | FireRemoveItem;

export default function useFirestore() {
  const orderDetails = useAppSelector((state) => state.orderDetails);
  const openOrders = useAppSelector((state) => state.openOrders);

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
    if (input.type === "toggle" || input.type === "addIngredient") {
      try {
        let orderID: string | undefined;

        openOrders.forEach((order) => {
          order.orderItemDetails.forEach((item) => {
            if (item.itemId === input.itemID) {
              orderID = order.orderId;
            }
          });
        });

        const docRef = doc(db, "orders", orderID!);
        await updateDoc(docRef, { orderItemDetails: [...orderDetails.orderItemDetails] });
      } catch (error) {
        console.log(error);
      }
    }
    if (input.type === "removeItem") {
      let orderID: string | undefined;

      openOrders.forEach((order) => {
        order.orderItemDetails.forEach((item) => {
          if (item.itemId === input.itemID) {
            orderID = order.orderId;
          }
        });
      });

      const order = openOrders.find((order) => order.orderId === orderID);

      const test = orderDetails.orderItemDetails;

      if (order?.orderItemDetails.length === 1 && orderID !== undefined) {
        try {
          const docRef = doc(db, "orders", orderID);
          await deleteDoc(docRef);
          console.log("deleted the last");
        } catch (error) {
          console.log(error);
        }
      } else if (orderID !== undefined) {
        try {
          const docRef = doc(db, "orders", orderID);
          if (order?.orderItemDetails !== undefined) {
            // let orderItemDetailsToSpread = order?.orderItemDetails.filter((item) => item.orderID === orderID);

            // orderItemDetailsToSpread = orderItemDetailsToSpread.filter((item) => item.itemId !== input.itemID);

            const orderItemDetailsToSpread = order?.orderItemDetails.filter((item) => item.itemId !== input.itemID);

            await updateDoc(docRef, { orderItemDetails: [...orderItemDetailsToSpread] });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return sendFirestore;
}
