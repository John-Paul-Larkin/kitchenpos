import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
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

interface FireRemoveItem {
  itemIDsToRemove: string[];
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

        const orderItemWithoutSent = orderDetails.orderItemDetails.filter((item) => item.isSentToKitchen !== true);
        const docRef = doc(db, "orders", orderID!);
        await updateDoc(docRef, { orderItemDetails: [...orderItemWithoutSent] });
      } catch (error) {
        console.log(error);
      }
    }

    if (input.type === "removeItem") {
      // input.itemIDsToRemove here is a list of all the items to be removed when the user edits

      let listOfOrderIDs = getOrderIDforEachItemID(input.itemIDsToRemove, openOrders);
      listOfOrderIDs = removeDuplicates(listOfOrderIDs);

      listOfOrderIDs.forEach((orderID) => {
        let orderItemDetails = openOrders.find((order) => order.orderId === orderID)?.orderItemDetails;

        orderItemDetails = orderItemDetails?.filter((item) => {
          if (!input.itemIDsToRemove.includes(item.itemId)) {
            return item;
          } else return null;
        });

        sendEditedorderItemIDs(orderItemDetails, orderID);
      });
    }
  };

  return sendFirestore;
}

function getOrderIDforEachItemID(itemIDsToRemove: string[], openOrders: OrderDetails[]) {
  let listOfOrderIDs: string[] = [];

  itemIDsToRemove.forEach((itemID) => {
    openOrders.forEach((order) => {
      order.orderItemDetails.forEach((item) => {
        if (item.itemId === itemID) {
          listOfOrderIDs.push(order.orderId);
        }
      });
    });
  });
  return listOfOrderIDs;
}

function removeDuplicates(arr: string[]) {
  let unique: string[] = [];
  arr.forEach((element) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
}

async function sendEditedorderItemIDs(orderItemDetails: MenuItem[] | undefined, orderID: string) {
  if (orderItemDetails === undefined || orderItemDetails.length === 0) {
    try {
      const docRef = doc(db, "orders", orderID);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const docRef = doc(db, "orders", orderID);
      // if (order?.orderItemDetails !== undefined) {
      // let orderItemDetailsToSpread = order?.orderItemDetails.filter((item) => item.orderID === orderID);
      // orderItemDetailsToSpread = orderItemDetailsToSpread.filter((item) => item.itemId !== input.itemID);
      // const orderItemDetailsToSpread = order?.orderItemDetails.filter((item) => item.itemId !== input.itemID);
      await updateDoc(docRef, { orderItemDetails: [...orderItemDetails] });
    } catch (error) {
      console.log(error);
    }
  }
}
