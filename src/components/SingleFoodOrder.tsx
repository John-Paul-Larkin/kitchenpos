import { differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
import { useAppDispatch } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { changeOrderStatus } from "../features/openOrdersSlice";
import { changeTableNumberOrderDetails } from "../features/orderDetailsSlice";
import useChangeTableNumber from "../Hooks/useChangeTableNumber";
import styles from "../styles/FloorPlan.module.css";

function Stopwatch({ startTime }: { startTime: Date }) {
  const stopwatchOffset = new Date();
  const timeNow = new Date();

  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + differenceInSeconds(timeNow, startTime));

  const { seconds, minutes } = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset });

  // extra digit for formatting under ten seconds
  let extraDigit: null | string = null;
  if (seconds < 10) {
    extraDigit = "0";
  }

  return (
    <div className={styles["stopwatch"]}>
      {minutes}:{extraDigit}
      {seconds}
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

  let extraDigit: null | string = null;

  if (seconds < 10) {
    extraDigit = "0";
  }

  return (
    <div className={styles["timer"]}>
      {minutes}:{extraDigit}
      {seconds}
    </div>
  );
}

export default function SingleFoodOrder({ order }: { order: OrderDetails }) {
  const [isShowStopWatch, setIsShowStopWatch] = useState(false);
  const { setisShowFloorPlan, setSelectedTableNumber } = useContext(menuContext);
  const dispatch = useAppDispatch();

  const finishTime = new Date(order.timeOrderPlaced! + 600000);

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

  const orderTimeDisplay = new Date(order.timeOrderPlaced!).toLocaleTimeString().substring(0,4);

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
      {!isShowStopWatch && <Timer setIsShowStopWatch={setIsShowStopWatch} finishTime={finishTime} orderID={order.orderId} />}
      {isShowStopWatch && <Stopwatch startTime={finishTime} />}

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
