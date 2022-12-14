import OrderDetails from "./OrderDetails";
import OrderItemOptions from "./OrderItemOptions";
import styles from "../styles/OrderScreen.module.css";

export default function OrderScreen({ setisShowFloorPlan }: FloorPlanSet) {
  return (
    <div className={styles["order-screen"]}>
      <OrderDetails setisShowFloorPlan={setisShowFloorPlan} />
      <OrderItemOptions />
    </div>
  );
}
