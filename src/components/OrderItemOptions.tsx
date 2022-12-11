import { useContext, useEffect } from "react";
import styles from "../styles/OrderScreen.module.css";
import { menuContext } from "./MenuContext";
import { Switch } from "@mui/material";

export default function OrderItemOptions() {
  const { setSelectedOrderItem, orderDetails, selectedOrderItem, dispatch } = useContext(menuContext);
  const handleSwitchToggle = (id: string) => {
    dispatch({ type: "toggleIngredient", payload: id });
  };

  useEffect(() => {
    if (orderDetails.orderItemDetails) {
      console.log(orderDetails.orderItemDetails);
      setSelectedOrderItem(() => orderDetails.orderItemDetails[orderDetails.orderItemDetails.length - 1]);
    } else {
      setSelectedOrderItem(null);
    }
  }, [setSelectedOrderItem, orderDetails.orderItemDetails]);

  return (
    <>
      <div className={styles["order-item-details"]}>
        OrderItemOptions
        {selectedOrderItem && <h2>{selectedOrderItem.name}</h2>}
        {selectedOrderItem?.ingredients &&
          selectedOrderItem.ingredients.map((ingredient) => (
            <div key={ingredient.id}>
              {ingredient.ingredient}
              <Switch checked={ingredient.selected} onClick={() => handleSwitchToggle(ingredient.id!)} />
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          dispatch({ type: "remove", payload: selectedOrderItem!.id });
        }}
      >
        Remove
      </button>
    </>
  );
}
