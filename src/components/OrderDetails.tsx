import DoneIcon from "@mui/icons-material/Done";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { addOrderToOpenOrders } from "../features/openOrdersSlice";
import { addOrderTimeStripOutSentItemsOrderDetails, clearOrderDetails } from "../features/orderDetailsSlice";
import { setSelectedItemToEmpty, setSelectedOrderItem } from "../features/selectedOrderItemSlice";
import { auth } from "../Firebase/firebaseconfig";
import useFirestore from "../Hooks/useFirestore";
import styles from "../styles/OrderScreen.module.css";
import Alterations from "./Alterations";
import OrderDetailsBottom from "./OrderDetailsBottom";
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

  // console.log("oO", openOrders);
  // console.log("oD", orderDetails);

  const sendFirestore = useFirestore();

  const handleSendOrder = () => {
    // Only send through the order if at least one new item has been added
    if (orderDetails.orderItemDetails.filter((item) => item.isSentToKitchen !== true).length > 0) {
      // dispatch({ type: "add order/time- strip out sentToKitchen " });
      dispatch(addOrderTimeStripOutSentItemsOrderDetails());
    }

    setisShowFloorPlan(true);
  };

  useEffect(() => {
    if (orderDetails.timeOrderPlaced) {
      // Send the order to firebase
      sendFirestore({ orderDetails, type: "send" });
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
      <OrderDetailsBottom isAnyEdits={isAnyEdits} handleSendOrder={handleSendOrder} />
    </div>
  );
}
