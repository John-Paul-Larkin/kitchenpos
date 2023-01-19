import { Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSelectedItemToEmpty, toggleIngredientOnSelectedItem } from "../features/selectedOrderItemSlice";
import styles from "../styles/OrderScreen.module.css";
import SelectExtraIngredients from "./SelectExtraIngredients";

import { removeItemOpenOrders, toggeIngredientOpenOrders } from "../features/openOrdersSlice";
import { removeItem, toggleIngredientOnOrderDetails } from "../features/orderDetailsSlice";

export default function OrderItemOptions() {
  const orderDetails = useAppSelector((state) => state.orderDetails);
  const selectedOrderItem = useAppSelector((state) => state.selectedOrderItem);

  const dispatch = useAppDispatch();

  const handleSwitchToggleIngredient = (ingredientID: string) => {
    // find the index of the item whose ingredient we want to toggle
    const indexOfItemToToggleIngredient = orderDetails.orderItemDetails.indexOf(
      orderDetails.orderItemDetails.find((item) => item.itemId === selectedOrderItem!.itemId)!
    );
    // check if the item has already been sent to the kitchen
    if (orderDetails.orderItemDetails[indexOfItemToToggleIngredient].isSentToKitchen === true) {
      const itemID = orderDetails.orderItemDetails[indexOfItemToToggleIngredient].itemId;

      // if it has locate the item  within the list of open orders
      // and toggle the ingredient to not selected
      dispatch(toggeIngredientOpenOrders({ itemID, ingredientID }));
    }
    // Then toggle the item on the current order
    // dispatch({ type: "toggleIngredient", payload: ingredientId });
    dispatch(toggleIngredientOnOrderDetails(ingredientID));

    dispatch(toggleIngredientOnSelectedItem(ingredientID));
  };

  const handleRemoveItem = () => {
    if (selectedOrderItem?.isSentToKitchen === true) {
      dispatch(removeItemOpenOrders(selectedOrderItem.itemId));
    }

    // remove the item - this time from the list of items in the current order. ie visible on screen
    // dispatch({ type: "remove item", payload: selectedOrderItem!.itemId });
    if (selectedOrderItem !== null) {
      dispatch(removeItem(selectedOrderItem.itemId));
    }
    // setSelectedOrderItem(null);
    dispatch(setSelectedItemToEmpty());
  };

  return (
    <>
      <div className={styles["order-item-details"]}>
        <div className={styles["item-options"]}>Item options</div>
        <div className={styles["item-wrapper"]}>
          {selectedOrderItem && <h2>{selectedOrderItem.name}</h2>}
          {selectedOrderItem?.ingredients &&
            selectedOrderItem.ingredients.map((ingredient) => (
              <div key={ingredient.ingredientId} style={ingredient.added ? { color: "yellow" } : ingredient.selected ? {} : { color: "white" }}>
                {ingredient.ingredient}
                <Switch size="small" checked={ingredient.selected} onClick={() => handleSwitchToggleIngredient(ingredient.ingredientId!)} />
              </div>
            ))}
          {selectedOrderItem && selectedOrderItem?.station !== "bar" && <SelectExtraIngredients />}
        </div>

        <div className={styles["remove-button-wrapper"]}>
          <span className={styles["spacer"]}></span>
          <div className={styles["remove-button"]}>
            {selectedOrderItem && (
              <button
                onClick={() => {
                  handleRemoveItem();
                }}
              >
                Remove item
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
