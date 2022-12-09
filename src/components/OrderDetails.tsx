import { motion } from "framer-motion";
import { useContext } from "react";
import { menuContext } from "./MenuContext";
import styles from "../styles/OrderScreen.module.css";
import TableNumberSelect from "./TableNumberSelect";
import { useState } from "react";


export default function OrderDetails() {
  const { orderDetails } = useContext(menuContext);

  const [tableNumber, setTableNumber] = useState('1');




  return (
    <div className={styles["order-screen-container"]}>
      <TableNumberSelect tableNumber={tableNumber} setTableNumber={setTableNumber} />
      <span>Open tables (7)</span>
      <h2>Items</h2>
      <div className={styles["order-screen"]}>
        {orderDetails.orderItemDetails &&
          orderDetails.orderItemDetails.map((order) => (
            <motion.div
              className={styles["order-items"]}
              key={order.id}
              initial={{ y: 300, opacity: 1, scaleY: 1.5 }}
              animate={{ y: 0, opacity: 1, scaleY: 1 }}
              transition={{ ease: "easeInOut" }}
            >
              {order.name}
            </motion.div>
          ))}
      </div>
      
      <button onClick={()=>console.log(tableNumber)}>sdasf</button>
    </div>
  );
}
