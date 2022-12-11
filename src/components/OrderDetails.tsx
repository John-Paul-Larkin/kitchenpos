import { motion } from "framer-motion";
import { useContext } from "react";
import { menuContext } from "./MenuContext";
import styles from "../styles/OrderScreen.module.css";
import TableNumberSelect from "./TableNumberSelect";
import { useState } from "react";

export default function OrderDetails() {
  const { orderDetails } = useContext(menuContext);

  const [tableNumber, setTableNumber] = useState("1");

  const { selectedOrderItem, setSelectedOrderItem } = useContext(menuContext);

  return (
    <div className={styles["order-items-screen-container"]}>
      <TableNumberSelect tableNumber={tableNumber} setTableNumber={setTableNumber} />
      <span>Open tables (7)</span>
      <h2>Items</h2>
      <div className={styles["order-items-screen"]}>
        {orderDetails.orderItemDetails &&
          orderDetails.orderItemDetails.map((orderItem) => (
            <motion.div
              className={

                selectedOrderItem?.id === orderItem.id ?
                
                  styles["selected"] :   styles["order-items"]
              
              
              }
              key={orderItem.id}
              initial={{ y: 300, opacity: 1, scaleY: 1.5 }}
              animate={{ y: 0, opacity: 1, scaleY: 1 }}
              transition={{ ease: "easeInOut" }}
              onClick={() => setSelectedOrderItem(orderItem)}
            >
              {orderItem.name}
            </motion.div>
          ))}
      </div>

    </div>
  );
}
