import OrderDetails from "./OrderDetails";
import OrderItemOptions from "./OrderItemOptions";
import styles from "../styles/OrderScreen.module.css";

export default function OrderScreen() {
  return (
    <div className={styles["order-screen"]}>
      <OrderDetails />
      <OrderItemOptions />
    </div>
  );
}
