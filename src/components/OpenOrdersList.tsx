import { useAppSelector } from "../app/hooks";
import styles from "../styles/FloorPlan.module.css";
import SingleFoodOrder from "./SingleFoodOrder";

export default function OpenOrdersList() {
  const openOrders = useAppSelector((state) => state.openOrders);



  // openOrders.forEach((order) => console.log(order.tableNumber, order.orderStatus));

  return (
    <div className={styles["open-orders-container"]}>
      <div className={styles["food-heading"]}>Open orders</div>

      <div className={styles["food-orders-wrapper"]}>
        <div className={styles["food-orders"]}>
          {openOrders &&
            openOrders.filter((order) => order.orderStatus === "pending").map((order) => <SingleFoodOrder key={order.orderId} order={order} />)}
        </div>
      </div>
      <div className={styles["ready-orders-wrapper"]}>
        <div className={styles["ready-orders"]}>
          {openOrders &&
            openOrders
              .filter((order) => order.orderStatus !== "pending")
              .sort((a, b) => {
                if (a.orderStatus > b.orderStatus) {
                  return -1;
                } else return 1;
              })
              .map((order) => <SingleFoodOrder key={order.orderId} order={order} />)}
        </div>
      </div>
    </div>
  );
}
