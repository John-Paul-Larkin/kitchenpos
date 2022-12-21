import React, { useContext } from "react";
import styles from "../styles/FloorPlan.module.css";
import { menuContext } from "./MenuContext";
import SingleOpenOrder from "./SingleOpenOrder";

export default function OpenOrders() {
  const { openOrders } = useContext(menuContext);

  return (
    <div className={styles["open-orders-container"]}>
      <div className={styles["food-orders"]}>
        {openOrders &&
          openOrders.map((order) => {
            return (
              <React.Fragment key={order.orderId}>
                <SingleOpenOrder order={order} />
              </React.Fragment>
            );
          })}
      </div>
      <div className={styles["drinks-orders"]}>

      </div>
    </div>
  );
}
