import { motion } from "framer-motion";
import { useContext } from "react";
import { menuContext } from "./MenuContext";
import styles from "../styles/OrderScreen.module.css";
import TableNumberSelect from "./TableNumberSelect";
import { useState } from "react";
import Alterations from "./Alterations";

export default function OrderDetails() {
  const { orderDetails } = useContext(menuContext);

  const [tableNumber, setTableNumber] = useState("1");

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

  return (
    <div className={styles["order-items-screen-container"]}>
      <TableNumberSelect tableNumber={tableNumber} setTableNumber={setTableNumber} />
      <span>Open tables (7)</span>
      <h2>Items</h2>
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
      <div>Total: {orderDetails.orderItemDetails && calcTotal()}</div>
    </div>
  );
}
