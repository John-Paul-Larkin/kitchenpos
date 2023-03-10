import { motion } from "framer-motion";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { changeTableNumberOrderDetails } from "../features/orderDetailsSlice";
import useChangeTableNumber from "../Hooks/useChangeTableNumber";
import styles from "../styles/FloorPlan.module.css";

export default function TableDetailsOnHover({ tableNumber }: { tableNumber: string }) {
  const openOrders = useAppSelector((state) => state.openOrders);

  const orders = openOrders.filter((order) => order.tableNumber === tableNumber);

  const order = orders[0];

  let itemDetails: MenuItem[] = [];

  orders.forEach((order) => order.orderItemDetails.forEach((item) => itemDetails.push(item)));

  const { setisShowFloorPlan, setSelectedTableNumber } = useContext(menuContext);
  const dispatch = useAppDispatch();
  const changeTableNumber = useChangeTableNumber();

  const handleOpenOrderClick = () => {
    setisShowFloorPlan(false);
    dispatch(changeTableNumberOrderDetails(order.orderId));
    changeTableNumber(order.tableNumber);
    setSelectedTableNumber(order.tableNumber);
  };

  let borderColor = "3px solid red";

  if (order.orderStatus === "time up") {
    borderColor = "3px solid orange";
  } else if (order.orderStatus === "ready") {
    borderColor = "3px solid green";
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      className={styles["open-orders-hover"]}
      onClick={handleOpenOrderClick}
      style={{ border: borderColor }}
    >
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
