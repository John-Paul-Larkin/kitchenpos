import { useContext } from "react";
import { addExtraIngredientToOpenOrders, removeItemFromOpenOrders, toggleIngredientOpenOrders } from "../features/openOrdersSlice";
import { setSelectedItemToEmpty } from "../features/selectedOrderItemSlice";

import { menuContext } from "../Context/MenuContext";
import { clearEdits } from "../features/unsentOrderEditsSlice";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearOrderDetails } from "../features/orderDetailsSlice";

import useFirestore from "../Hooks/useFirestore";
import styles from "../styles/OrderScreen.module.css";

export default function OrderDetailsBottom({ isAnyEdits, handleSendOrder }: { isAnyEdits: boolean; handleSendOrder: () => void }) {
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector((state) => state.orderDetails);
  const unsentOrderEdits = useAppSelector((state) => state.unsentOrderEdits);

  const { setisShowFloorPlan } = useContext(menuContext);
  const sendFirestore = useFirestore();

  // calculates the total price of all items and returns as formatted string
  const calcTotal = (): string => {
    const totalPrice = orderDetails.orderItemDetails.reduce((total, current) => {
      return total + current.price;
    }, 0);
    return totalPrice.toLocaleString(undefined, {
      style: "currency",
      currency: "EUR",
    });
  };

  const handleSaveEdits = () => {
    let itemIDsToRemove: string[] = [];

    unsentOrderEdits.forEach((edit) => {
      // here we cycle through the array of edits and send the edit to firestore
      // the exception is remove edits, which we push to an array, so they can all
      // be processed in one batch

      const editType = edit.editType;
      const itemID = edit.itemID;

      if (editType === "toggleIngredientOpenOrders") {
        dispatch(toggleIngredientOpenOrders({ itemID, ingredientID: edit.ingredientID }));
        sendFirestore({ itemID, ingredientID: edit.ingredientID, type: "toggle" });
      } else if (edit.editType === "addExtraIngredientToOpenOrders") {
        dispatch(addExtraIngredientToOpenOrders({ itemID, ingredientToAdd: edit.ingredientToAdd }));
        sendFirestore({ itemID, ingredientToAdd: edit.ingredientToAdd, type: "addIngredient" });
      } else if (edit.editType === "removeItemFromOpenOrders") {
        dispatch(removeItemFromOpenOrders({ itemID }));
        itemIDsToRemove.push(itemID);
      }
    });

    sendFirestore({ itemIDsToRemove, type: "removeItem" });

    let anyNewItemsAddedSinceEdit: boolean = false;
    orderDetails.orderItemDetails.forEach((item) => {
      if (item.isSentToKitchen !== true) {
        anyNewItemsAddedSinceEdit = true;
      }
    });

    // Weird bug here. TS wont allow anyNewItemsAddedSinceEdit === true
    // but will allow the double negative !== false
    // casting anyNewsItems as boolean fixes it????
    if ((anyNewItemsAddedSinceEdit as boolean) === false) {
      setisShowFloorPlan(true);
    }
    // otherwise dont show floor plan as user still needs to send through the new items
    dispatch(clearEdits());
  };

  const handleCancelEdits = () => {
    dispatch(clearEdits());
    dispatch(setSelectedItemToEmpty());
    dispatch(clearOrderDetails());
    setisShowFloorPlan(true);
  };

  const handleFloorPlan = () => {
    dispatch(setSelectedItemToEmpty());
    dispatch(clearOrderDetails());
    setisShowFloorPlan(true);
  };

  return (
    <div className={styles["bottom"]}>
      <div className={styles["total-amount"]}>
        <div>Total:</div>
        <div className={styles["amount"]}>
          {orderDetails.orderItemDetails && calcTotal()}
          {!orderDetails.orderItemDetails && "€0.00"}
        </div>
      </div>

      <div className={styles["buttons"]}>
        {!isAnyEdits && <button onClick={() => handleFloorPlan()}>Floor plan</button>}
        {isAnyEdits && <button onClick={() => handleCancelEdits()}>Cancel Edits</button>}

        {!isAnyEdits && <button onClick={() => handleSendOrder()}>Send</button>}
        {isAnyEdits && <button onClick={() => handleSaveEdits()}>Save Edits</button>}
      </div>
    </div>
  );
}
