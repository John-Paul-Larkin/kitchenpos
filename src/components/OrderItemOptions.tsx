import { useContext} from "react";
import styles from "../styles/OrderScreen.module.css";
import { menuContext } from "./MenuContext";
import { Switch } from "@mui/material";

export default function OrderItemOptions() {
  const { selectedOrderItem } = useContext(menuContext);

  return (
    <div className={styles["order-item-details"]}>
      OrderItemOptions
      {selectedOrderItem && <h2>{selectedOrderItem.name}</h2>}
      {selectedOrderItem?.ingredients && selectedOrderItem.ingredients.map((ingredient) => <div key={ingredient}>{ingredient}
        <Switch defaultChecked/>
      </div>)}
    </div>
  );
}

// const { dispatch } = useContext(menuContext);
// dispatch({ type: "remove", payload: orderItem.id });
