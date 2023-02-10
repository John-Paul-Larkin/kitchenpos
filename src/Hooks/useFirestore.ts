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
    } else if (input.type === "toggle" || input.type === "addIngredient") {
      //ie an edit to an already sent order
      try {
        let orderID: string | undefined;
        // find the id of the order which contains the item to edit
        openOrders.forEach((order) => {
          order.orderItemDetails.forEach((item) => {
            if (item.itemId === input.itemID) {
              orderID = order.orderId;
            }
          });
        });

        // get array of item IDs which were on that particulaar order
        const itemIDsInOrder = openOrders.find((order) => order.orderId === orderID)?.orderItemDetails.map((item) => item.itemId)!;

        // filter order Items to only include items from the particular ID
        let onlyRelevantItemDetails = orderDetails.orderItemDetails.filter((item) => itemIDsInOrder.includes(item.itemId));

        // const orderItemDetails = openOrders.find(order=>order.orderId === orderID)?.orderItemDetails
        const docRef = doc(db, "orders", orderID!);

        await updateDoc(docRef, { orderItemDetails: [...onlyRelevantItemDetails] });
      } catch (error) {
        console.log(error);
      }
    } else if (input.type === "removeItem") {
      // input.itemIDsToRemove is a list of all the items to be removed when the user edits

      let listOfOrderIDs = getOrderIDforEachItemID(input.itemIDsToRemove, openOrders);
      listOfOrderIDs = removeDuplicates(listOfOrderIDs);

      listOfOrderIDs.forEach((orderID) => {
        let orderItemDetails = openOrders.find((order) => order.orderId === orderID)?.orderItemDetails;

        orderItemDetails = orderItemDetails?.filter((item) => {
          if (!input.itemIDsToRemove.includes(item.itemId)) {
            return item;
          } else return null;
        });

        sendEditedOrderItemIDs(orderItemDetails, orderID);
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

async function sendEditedOrderItemIDs(orderItemDetails: MenuItem[] | undefined, orderID: string) {
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
      await updateDoc(docRef, { orderItemDetails: [...orderItemDetails] });
    } catch (error) {
      console.log(error);
    }
  }
}
