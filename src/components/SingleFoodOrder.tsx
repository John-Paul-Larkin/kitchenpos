import { add } from "date-fns";
import { motion } from "framer-motion";
import React, { useContext, useRef, useState } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
import { useAppDispatch } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { changeOrderStatus } from "../features/openOrdersSlice";
import { changeTableNumberOrderDetails } from "../features/orderDetailsSlice";
import useChangeTableNumber from "../Hooks/useChangeTableNumber";
import styles from "../styles/FloorPlan.module.css";

function Stopwatch() {
  const { seconds, minutes } = useStopwatch({ autoStart: true });

  return (
    <div className={styles["stopwatch"]}>
      {minutes}:{seconds}
    </div>
  );
}

function Timer({
  setIsShowStopWatch,
  finishTime,
  orderID,
}: {
  setIsShowStopWatch: React.Dispatch<React.SetStateAction<boolean>>;
  finishTime: Date;
  orderID: string;
}) {
  const dispatch = useAppDispatch();

  const { seconds, minutes } = useTimer({
    expiryTimestamp: finishTime,
    onExpire: () => {
      dispatch(changeOrderStatus(orderID));
      setIsShowStopWatch(true);
    },
  });

  return (
    <div className={styles["timer"]}>
      {minutes} {seconds}{" "}
    </div>
  );
}

export default function SingleFoodOrder({ order }: { order: OrderDetails }) {
  const [isShowStopWatch, setIsShowStopWatch] = useState(false);

  const dispatch = useAppDispatch();

  const orderTime = new Date(order.timeOrderPlaced!);

  const finishTime = useRef(add(orderTime, { seconds: 600 }));

  const { setisShowFloorPlan, setSelectedTableNumber } = useContext(menuContext);

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
  }

  const orderTimeDisplay = new Date(order.timeOrderPlaced!).toLocaleTimeString();

  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      className={styles["open-orders"]}
      onClick={handleOpenOrderClick}
      style={{ border: borderColor }}
    >
      <div className={styles["time-order-placed"]}>{orderTimeDisplay}</div>

      <div className={styles["table-number"]}>{order.tableNumber}</div>
      {!isShowStopWatch && <Timer setIsShowStopWatch={setIsShowStopWatch} finishTime={finishTime.current} orderID={order.orderId} />}
      {isShowStopWatch && <Stopwatch />}

      <div>
        {order.orderItemDetails.map((item) => {
          if (item.station !== "bar") {
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
