import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { menuContext } from "./MenuContext";
import styles from "../styles/OrderScreen.module.css";
import TableNumberSelect from "./TableNumberSelect";
import Alterations from "./Alterations";
import useSendOrder from "../Helper/useSendOrder";

export default function OrderDetails() {
  const { orderDetails } = useContext(menuContext);
  const { dispatch } = useContext(menuContext);

  const { selectedOrderItem, setSelectedOrderItem } = useContext(menuContext);

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
    const timeNow = new Date();
    dispatch({ type: "add order time", payload: timeNow });
  };

  useEffect(() => {
    sendOrder(orderDetails);
    dispatch({ type: "clear order" });
    console.count("in use effect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails.timeOrderPlaced]);

  return (
    <div className={styles["order-items-screen-container"]}>
      <div className={styles["top"]}>
        <TableNumberSelect />
        <span>Open tables (7)</span>
      </div>
      <div className={styles["middle"]}>
        <div className={styles["order-items-screen"]}>
          {orderDetails.orderItemDetails &&
            orderDetails.orderItemDetails.map((orderItem) => (
              <motion.div
                className={selectedOrderItem?.id === orderItem.id ? styles["selected"] : styles["order-items"]}
                key={orderItem.id}
                initial={{ y: 300, opacity: 1, scaleY: 1.5 }}
                animate={{ y: 0, opacity: 1, scaleY: 1 }}
                transition={{ ease: "easeInOut" }}
                onClick={() => setSelectedOrderItem(orderItem)}
              >
                <div className={styles["name-price"]}>
                  <span className={styles["name"]}>{orderItem.name}</span>
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
        <button>Cancel</button>
        <button>Message</button>
        <button onClick={() => handleSendOrder()}>Send</button>
      </div>
    </div>
  );
}
