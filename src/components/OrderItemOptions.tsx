import { useContext } from "react";
import styles from "../styles/OrderScreen.module.css";
import { menuContext } from "./MenuContext";
import { Switch } from "@mui/material";

export default function OrderItemOptions() {
  const { setSelectedOrderItem, orderDetails, selectedOrderItem, dispatch } = useContext(menuContext);
  const handleSwitchToggleIngredient = (id: string) => {
    dispatch({ type: "toggleIngredient", payload: id });
  };

  const handleRemoveItem = () => {
    // find the menu item object which mathches the id of item to remove
    const indexOfRemovedItemInArray = orderDetails.orderItemDetails.indexOf(
      orderDetails.orderItemDetails.filter((item) => item.itemId === selectedOrderItem!.itemId)[0]
    );
    // remove the item
    dispatch({ type: "remove", payload: selectedOrderItem!.itemId });
    if (orderDetails.orderItemDetails.length === 1 && indexOfRemovedItemInArray === 0) {
      // if the removed item was the last remaining in the array => set selected to null
      setSelectedOrderItem(null);
    } else if (indexOfRemovedItemInArray === 0) {
      // if its not the last item, but it is the first in the array. note position 1 as orderdetails state has not updated yet.
      setSelectedOrderItem(orderDetails.orderItemDetails[1]);
    } else {
      setSelectedOrderItem(orderDetails.orderItemDetails[indexOfRemovedItemInArray - 1]);
    }
  };


  return (
    <>
      <div className={styles["order-item-details"]}>
        OrderItemOptions
        {selectedOrderItem && <h2>{selectedOrderItem.name}</h2>}
        {selectedOrderItem?.ingredients &&
          selectedOrderItem.ingredients.map((ingredient) => (
            <div key={ingredient.ingredientId} style={ingredient.selected ? {} : { color: "white" }}>
              {ingredient.ingredient}
              <Switch size="small" checked={ingredient.selected} onClick={() => handleSwitchToggleIngredient(ingredient.ingredientId!)} />
            </div>
          ))}
        {selectedOrderItem && (
          <button
            onClick={() => {
              handleRemoveItem();
            }}
          >
            Remove
          </button>
        )}
      </div>
    </>
  );
}
