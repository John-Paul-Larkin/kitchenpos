import { add } from "date-fns";
import React, { useContext } from "react";
import { useRef, useState } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
import useChangeTableNumber from "../Helper/useChangeTableNumber";
import styles from "../styles/FloorPlan.module.css";
import { menuContext } from "./MenuContext";

function Stopwatch() {
  const { seconds, minutes } = useStopwatch({ autoStart: true });

  return (
    <div>
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
  orderID: String;
}) {
  const { setOpenOrders } = useContext(menuContext);

  const { seconds, minutes } = useTimer({
    expiryTimestamp: finishTime,
    onExpire: () => {
      setOpenOrders((cur) =>
        // once the timer runs out
        // change the status of the table and color will change to orange
        cur.map((order) => {
          if (order.orderId === orderID) {
            return { ...order, orderStatus: "time up" };
          } else {
            return order;
          }
        })
      );
      setIsShowStopWatch(true);
    },
  });

  return (
    <div>
      {minutes} {seconds}{" "}
    </div>
  );
}
const MemoizedTimer = React.memo(Stopwatch);

export default function SingleOpenOrder({ order }: { order: OrderDetails }) {
  const [isShowStopWatch, setIsShowStopWatch] = useState(false);

  const finishTime = useRef(add(order.timeOrderPlaced!, { seconds: 10 }));

  const { setisShowFloorPlan, dispatch } = useContext(menuContext);

  const changeTableNumber = useChangeTableNumber();

  const handleOpenOrderClick = () => {
    setisShowFloorPlan(false);
    dispatch({ type: "change table number", payload: order.orderId });
    changeTableNumber(order.tableNumber);
  };

  let borderColor = "3px solid red";

  if (order.orderStatus === "time up") {
    borderColor = "3px solid orange";
  }

  return (
    <div className={styles["open-orders"]} onClick={handleOpenOrderClick} style={{ border: borderColor }}>
      <div>{order.timeOrderPlaced!.toLocaleTimeString()}</div>

      {!isShowStopWatch && <Timer setIsShowStopWatch={setIsShowStopWatch} finishTime={finishTime.current} orderID={order.orderId} />}
      {isShowStopWatch && <MemoizedTimer />}

      <div className={styles["table"]}>{order.tableNumber}</div>
      <div>
        {order.orderItemDetails.map((item) => (
          <div className={styles["items"]} key={item.itemId}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
