import { motion } from "framer-motion";
import { useAppSelector } from "../app/hooks";
import styles from "../styles/FloorPlan.module.css";

export default function SingleCompleteOrder({ tableNumber }: { tableNumber: string }) {


  const openOrders = useAppSelector(state=>state.openOrders)

  const orders = openOrders.filter((order) => order.tableNumber === tableNumber);

  let itemDetails: MenuItem[] = [];

  orders.forEach((order) => order.orderItemDetails.forEach((item) => itemDetails.push(item)));

  return (
    <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }} className={styles["open-orders-hover"]}>
      <div className={styles["table-number"]}>{tableNumber}</div>
      <div>
        {itemDetails.map((item) => {
          return (
            <div className={styles["items"]} key={item.itemId}>
              {item.name}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
