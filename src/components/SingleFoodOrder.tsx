import { differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useStopwatch, useTimer } from "react-timer-hook";
import { menuContext } from "../Context/MenuContext";
import useChangeTableNumber from "../Hooks/useChangeTableNumber";
import { useAppDispatch } from "../app/hooks";
import { changeOrderStatus } from "../features/openOrdersSlice";
import { changeTableNumberOrderDetails } from "../features/orderDetailsSlice";
import styles from "../styles/FloorPlan.module.css";
import TableDetailsOnHover from "./TableDetailsOnHover";

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

  // const swfinishTime = new Date(order.timeTimeUp!);
  const tenMinutes = 600000;

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
  useEffect(() => {
    if (order.timeTimeUp) {
      setIsShowStopWatch(true);
    }
  }, [order.timeTimeUp]);

  let orderTimeDisplay = new Date(order.timeOrderPlaced!).toLocaleTimeString().substring(0, 4);

  const [isShowTableDetails, setIsShowTableDetails] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      className={styles["open-orders"]}
      onClick={handleOpenOrderClick}
      style={{ border: borderColor }}
      onHoverStart={() => setIsShowTableDetails(true)}
      onHoverEnd={() => setIsShowTableDetails(false)}
    >
      {isShowTableDetails && createPortal(<TableDetailsOnHover tableNumber={order.tableNumber} />, document.getElementById(order.tableNumber)!)}

      <div className={styles["server-name"]}>{order.server}</div>
      <div>
        <div className={styles["time-order-placed"]}>{orderTimeDisplay}</div>
        <div className={styles["table-number"]}>{order.tableNumber}</div>
      </div>

      {!isShowStopWatch && (
        <Timer setIsShowStopWatch={setIsShowStopWatch} finishTime={new Date(order.timeOrderPlaced! + tenMinutes)} orderID={order.orderId} />
      )}
      {isShowStopWatch && <Stopwatch startTime={new Date(order.timeTimeUp!)} />}

      <div>
        {order.orderItemDetails.map((item) => {
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
