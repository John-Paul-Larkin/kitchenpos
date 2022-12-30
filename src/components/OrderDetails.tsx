import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { menuContext } from "./MenuContext";
import styles from "../styles/OrderScreen.module.css";
import TableNumberSelect from "./TableNumberSelect";
import Alterations from "./Alterations";
import useSendOrder from "../Helper/useSendOrder";
import DoneIcon from "@mui/icons-material/Done";

export default function OrderDetails() {
  const { orderDetails } = useContext(menuContext);
  const { dispatch } = useContext(menuContext);
  const { setOpenOrders } = useContext(menuContext);
  const { selectedOrderItem, setSelectedOrderItem } = useContext(menuContext);
  const { setisShowFloorPlan } = useContext(menuContext);

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
      dispatch({ type: "add order/time- strip out sentToKitchen " });
    }
  };

  useEffect(() => {
    if (orderDetails.timeOrderPlaced) {
      // Send the order to firebase
      sendOrder(orderDetails);

      // Add the order to an array of open Orders
      setOpenOrders((cur) => [orderDetails, ...cur]);
      //dispatch reducer to clear order object
      dispatch({ type: "clear order" });
      setisShowFloorPlan(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails.timeOrderPlaced]);

  return (
    <div className={styles["order-items-screen-container"]}>
      <div className={styles["top"]}>
        <TableNumberSelect handleSendOrder={handleSendOrder} />
      </div>
      <div className={styles["middle"]}>
        <div className={styles["order-items-screen"]}>
          {orderDetails.orderItemDetails &&
            orderDetails.orderItemDetails.map((orderItem) => (
              <motion.div
                className={selectedOrderItem?.itemId === orderItem.itemId ? styles["selected"] : styles["order-items"]}
                key={orderItem.itemId}
                initial={{ y: 300, opacity: 1, scaleY: 1.5 }}
                animate={{ y: 0, opacity: 1, scaleY: 1 }}
                transition={{ ease: "easeInOut" }}
                onClick={() => setSelectedOrderItem(orderItem)}
              >
                <div className={styles["name-price"]}>
                  <span className={styles["name"]}>
                    {orderItem.name}
                    <span>{orderItem.isSentToKitchen && <DoneIcon className={styles["done-icon"]}/>}</span>
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
      <div className={styles["total-amount"]}>
        <div>Total:</div>
        <div className={styles["amount"]}>
          {orderDetails.orderItemDetails && calcTotal()}
          {!orderDetails.orderItemDetails && "€0.00"}
        </div>
      </div>
      <div className={styles["buttons"]}>
        <button onClick={() => setisShowFloorPlan(true)}>FLoor plan</button>
        <button>Message</button>
        <button onClick={() => handleSendOrder()}>Send</button>
      </div>
    </div>
  );
}
