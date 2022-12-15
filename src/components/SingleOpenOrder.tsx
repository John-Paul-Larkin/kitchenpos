import { add } from "date-fns";
import React from "react";
import { useRef, useState } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
import styles from "../styles/FloorPlan.module.css";

function Stopwatch() {
  const { seconds, minutes } = useStopwatch({ autoStart: true });

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
}

function Timer({ setIsShowStopWatch, finishTime }: { setIsShowStopWatch: React.Dispatch<React.SetStateAction<boolean>>; finishTime: Date }) {
  const { seconds, minutes } = useTimer({ expiryTimestamp: finishTime, onExpire: () => setIsShowStopWatch(true) });

  return (
    <div>
      {minutes} {seconds}{" "}
    </div>
  );
}

export default function SingleOpenOrder({ order }: { order: OrderDetails }) {
  const [isShowStopWatch, setIsShowStopWatch] = useState(false);

  const finishTime = useRef(add(order.timeOrderPlaced!, { seconds: 10 }));

  const MemoizedTimer = React.memo(Stopwatch);

  return (
    <div className={styles["open-orders"]}>
      <div>{order.timeOrderPlaced!.toLocaleString()}</div>

      {!isShowStopWatch && <Timer setIsShowStopWatch={setIsShowStopWatch} finishTime={finishTime.current} />}
      {isShowStopWatch && <MemoizedTimer />}

      <div>Table : {order.tableNumber}</div>
      <div>
        {order.orderItemDetails.map((item: any) => (
          <div key={item.itemId}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
