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
  const openOrders = useAppSelector((state) => state.openOrders);

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
    unsentOrderEdits.forEach((edit) => {
      const editType = edit.editType;
      const orderID = edit.orderID;
      const itemID = edit.itemID;

      if (editType === "toggleIngredientOpenOrders") {
        dispatch(toggleIngredientOpenOrders({ orderID, itemID, ingredientID: edit.ingredientID }));
        console.log("bd", openOrders);

        sendFirestore({ orderID, itemID, ingredientID: edit.ingredientID, type: "toggle" });
      } else if (edit.editType === "addExtraIngredientToOpenOrders") {
        dispatch(addExtraIngredientToOpenOrders({ orderID, itemID, ingredientToAdd: edit.ingredientToAdd }));
        // sendFirestore()
      } else if (edit.editType === "removeItemFromOpenOrders") {
        dispatch(removeItemFromOpenOrders({ itemID, orderID }));
        // sendFirestore()
      }
    });

    let anyNewItemsAddedSinceEdit: boolean = false;
    orderDetails.orderItemDetails.forEach((item) => {
      if (item.isSentToKitchen !== true) {
        anyNewItemsAddedSinceEdit = true;
      }
    });

    // Weird bug here. TS wont allow anyNewitems === true
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

  console.log("odb", openOrders);

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
