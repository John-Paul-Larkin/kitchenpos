import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { menuContext } from "./MenuContext";
import styles from "../styles/OrderScreen.module.css";

export default function OrderScreen() {
  const { orderDetails } = useContext(menuContext);

  const [isShowIndividualOrderItemIngredients, setIsShowIndividualOrderItemIngredients] = useState(false);

  return (
    <div className={styles["order-screen"]}>
      Table No: 5
      {orderDetails &&
        orderDetails.map((order) => (
          <motion.div initial={{ y: 200 }} animate={{ y: 0 }} key={order.id}>
            <div
              className={styles["order-items"]}
              onClick={() => {
                setIsShowIndividualOrderItemIngredients((current) => !current);
              }}
            >
              {order.name}
              {isShowIndividualOrderItemIngredients && order.ingredients?.map((ingredient, index) => <div key={index}>{ingredient}</div>)}
            </div>
          </motion.div>
        ))}
    </div>
  );
}
