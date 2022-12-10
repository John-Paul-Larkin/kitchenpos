import OrderDetails from "./OrderDetails";
import OrderItemOptions from "./OrderItemOptions";
import styles from "../styles/OrderScreen.module.css";
import { useState } from "react";

export default function OrderScreen() {



  return (
    <div className={styles["order-screen"]}>
      <OrderItemOptions/>
      <OrderDetails />
    </div>
  );
}
