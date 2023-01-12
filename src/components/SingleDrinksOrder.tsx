import { motion } from "framer-motion";
import React, { useContext } from "react";
import { useStopwatch } from "react-timer-hook";
import useChangeTableNumber from "../Helper/useChangeTableNumber";
import styles from "../styles/FloorPlan.module.css";
import { menuContext } from "./MenuContext";

function Stopwatch() {
  const { seconds, minutes } = useStopwatch({ autoStart: true });

  return (
    <div className={styles["stopwatch"]}>
      {minutes}:{seconds}
    </div>
  );
}

export default function SingleFoodOrder({ order }: { order: OrderDetails }) {
  const { setisShowFloorPlan, dispatch } = useContext(menuContext);
  const changeTableNumber = useChangeTableNumber();

  const handleOpenOrderClick = () => {
    setisShowFloorPlan(false);
    dispatch({ type: "change table number", payload: order.orderId });
    changeTableNumber(order.tableNumber);
  };

  let borderColor = "3px solid blue";

  if (order.orderStatus === "ready") {
    borderColor = "3px solid green";
  }

  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      className={styles["open-orders"]}
      onClick={handleOpenOrderClick}
      style={{ border: borderColor }}
    >
      <div className={styles["time-order-placed"]}>{order.timeOrderPlaced!.toLocaleTimeString()}</div>

      <div className={styles["table-number"]}>{order.tableNumber}</div>
      <Stopwatch />
      <div>
        {order.orderItemDetails.map((item) => {
          if (item.station === "bar") {
            return (
              <div className={styles["items"]} key={item.itemId}>
                {item.name}
              </div>
            );
          } else return null;
        })}
      </div>
    </motion.div>
  );
}
