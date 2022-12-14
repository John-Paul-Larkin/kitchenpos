import { useContext, useState } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
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
export default function OpenOrders() {
  const { openOrders } = useContext(menuContext);

  const [isShowStopWatch, setIsShowStopWatch] = useState(false);

  const timeNow = new Date();
  timeNow.setSeconds(timeNow.getSeconds() + 10);

  const { seconds, minutes } = useTimer({ expiryTimestamp: timeNow, onExpire: () => setIsShowStopWatch(true) });

  return (
    <div className={styles["open-orders-container"]}>
      {openOrders &&
        openOrders.map((order) => {
          return (
            <div key={order.orderId} className={styles["open-orders"]}>
              <div>{order.timeOrderPlaced!.toLocaleString()}</div>

              {!isShowStopWatch && (
                <div>
                  {minutes} {seconds}{" "}
                </div>
              )}
              {isShowStopWatch && <Stopwatch />}

              <div>Table : {order.tableNumber}</div>
              <div>
                {order.orderItemDetails.map((item) => (
                  <div key={item.itemId}>{item.name}</div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
