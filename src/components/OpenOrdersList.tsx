import { useAppSelector } from "../app/hooks";
import styles from "../styles/FloorPlan.module.css";
import SingleFoodOrder from "./SingleFoodOrder";

export default function OpenOrdersList() {
  const openOrders = useAppSelector((state) => state.openOrders);

  const ordersPending = openOrders.filter((order) => order.orderStatus === "pending").sort((a, b) => b.timeOrderPlaced! - a.timeOrderPlaced!);
  const ordersTimeUp = openOrders.filter((order) => order.orderStatus === "time up").sort((a, b) => b.timeTimeUp! - a.timeTimeUp!);
  const ordersReady = openOrders.filter((order) => order.orderStatus === "ready").sort((a, b) => b.timeTimeUp! - a.timeTimeUp!);


  // openOrders.forEach((order) => console.log(order.tableNumber, order.orderStatus));

  return (
    <div className={styles["open-orders-container"]}>
      <div className={styles["food-heading"]}>Open orders</div>

      <div className={styles["food-orders-wrapper"]}>
        <div className={styles["food-orders"]}>
          {ordersPending && ordersPending.map((order) => <SingleFoodOrder key={order.orderId} order={order} />)}
        </div>
      </div>
      <div className={styles["ready-orders-wrapper"]}>
        <div className={styles["ready-orders"]}>
          {ordersTimeUp && ordersTimeUp.map((order) => <SingleFoodOrder key={order.orderId} order={order} />)}
          {ordersReady && ordersReady.map((order) => <SingleFoodOrder key={order.orderId} order={order} />)}
        </div>
      </div>
    </div>
  );
}
