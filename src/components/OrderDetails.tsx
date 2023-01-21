import DoneIcon from "@mui/icons-material/Done";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import {
  addExtraIngredientToOpenOrders,
  addOrderToOpenOrders,
  removeItemFromOpenOrders,
  toggeIngredientOpenOrders,
} from "../features/openOrdersSlice";
import { addOrderTimeStripOutSentItemsOrderDetails, clearOrderDetails } from "../features/orderDetailsSlice";
import { setSelectedItemToEmpty, setSelectedOrderItem } from "../features/selectedOrderItemSlice";
import { clearEdits } from "../features/unsentOrderEditsSlice";
import { auth } from "../Firebase/firebaseconfig";
import useSendOrder from "../Hooks/useSendOrder";
import styles from "../styles/OrderScreen.module.css";
import Alterations from "./Alterations";
import TableNumberSelect from "./TableNumberSelect";

export default function OrderDetails() {
  const [isAnyEdits, setIsAnyEdits] = useState(false);

  const { setisShowFloorPlan } = useContext(menuContext);
  const { setIsLoggedIn } = useContext(menuContext);

  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector((state) => state.orderDetails);
  const selectedOrderItem = useAppSelector((state) => state.selectedOrderItem);
  const unsentOrderEdits = useAppSelector((state) => state.unsentOrderEdits);
  // const openOrders = useAppSelector((state) => state.openOrders);
  // console.log("OD-", orderDetails);
  // console.log("OP-", openOrders);
  // console.log("Ed-", unsentOrderEdits);

  useEffect(() => {
    if (orderDetails.timeOrderPlaced) {
      //
      // Send the order to firebase
      sendOrder(orderDetails);

      // Add the order to an array of open Orders
      dispatch(addOrderToOpenOrders(orderDetails));
      //dispatch reducer to clear order object
      dispatch(clearOrderDetails());
      dispatch(setSelectedItemToEmpty());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails.timeOrderPlaced]);

  useEffect(() => {
    if (unsentOrderEdits.length > 0) {
      setIsAnyEdits(true);
    } else {
      setIsAnyEdits(false);
    }
  }, [unsentOrderEdits]);

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

  const sendOrder = useSendOrder();

  const handleSendOrder = () => {
    // Only send through the order if at least one new item has been added
    if (orderDetails.orderItemDetails.filter((item) => item.isSentToKitchen !== true).length > 0) {
      // dispatch({ type: "add order/time- strip out sentToKitchen " });
      dispatch(addOrderTimeStripOutSentItemsOrderDetails());
    }

    setisShowFloorPlan(true);
  };

  const handleSaveEdits = () => {
    unsentOrderEdits.forEach((edit) => {
      if (edit.editType === "toggleIngredientOpenOrders") {
        dispatch(toggeIngredientOpenOrders({ itemID: edit.itemID, ingredientID: edit.ingredientID }));
      } else if (edit.editType === "addExtraIngredientToOpenOrders") {
        dispatch(addExtraIngredientToOpenOrders({ ingredientToAdd: edit.ingredientToAdd, itemID: edit.itemID }));
      } else if (edit.editType === "removeItemFromOpenOrders") {
        dispatch(removeItemFromOpenOrders(edit.input));
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

  return (
    <div className={styles["order-items-screen-container"]}>
      <div className={styles["top"]}>
        <div className={styles["server-name"]} onClick={() => setIsLoggedIn(false)}>
          Server: {auth.currentUser?.displayName}
        </div>
        <TableNumberSelect handleSendOrder={handleSendOrder} />
      </div>
      <div className={styles["middle"]}>
        <div className={styles["order-items-screen"]}>
          {orderDetails.orderItemDetails &&
            orderDetails.orderItemDetails.map((orderItem) => (
              <motion.div
                className={selectedOrderItem.itemId === orderItem.itemId ? styles["selected"] : styles["order-items"]}
                key={orderItem.itemId}
                initial={{ y: 300, opacity: 1, scaleY: 1.5 }}
                animate={{ y: 0, opacity: 1, scaleY: 1 }}
                transition={{ ease: "easeInOut" }}
                onClick={() => dispatch(setSelectedOrderItem(orderItem))}
              >
                <div className={styles["name-price"]}>
                  <span className={styles["name"]}>
                    {orderItem.name}
                    <span>{orderItem.isSentToKitchen && <DoneIcon className={styles["done-icon"]} />}</span>
                  </span>

                  <Alterations ingredients={orderItem.ingredients} />
                  <span className={styles["price-container"]}>
                    <span className={styles["price"]}>
                      {orderItem.price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
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
    </div>
  );
}
