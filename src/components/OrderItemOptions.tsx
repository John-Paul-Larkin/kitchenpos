import { Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSelectedItemToEmpty, toggleIngredientOnSelectedItem } from "../features/selectedOrderItemSlice";
import styles from "../styles/OrderScreen.module.css";
import SelectExtraIngredients from "./SelectExtraIngredients";

import { removeItemFromOrderDetails, toggleIngredientOnOrderDetails } from "../features/orderDetailsSlice";
import { addNewEdit } from "../features/unsentOrderEditsSlice";

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
      const orderID = orderDetails.orderId;
      // if it has locate the item  within the list of open orders
      // and toggle the ingredient to not selected


      dispatch(addNewEdit({ orderID:orderID, itemID: itemID, ingredientID: ingredientID, editType: "toggleIngredientOpenOrders" }));
    }
    // Then toggle the item on the current order
    dispatch(toggleIngredientOnOrderDetails(ingredientID));

    dispatch(toggleIngredientOnSelectedItem(ingredientID));
  };

  const handleremoveItemFromOrderDetails = () => {
    if (selectedOrderItem?.isSentToKitchen === true) {
      // dispatch(removeItemFromOpenOrders(selectedOrderItem.itemId));

      dispatch(addNewEdit({ orderID:orderDetails.orderId ,itemID:selectedOrderItem.itemId , editType: "removeItemFromOpenOrders" }));
    }

    // remove the item - this time from the list of items in the current order. ie visible on screen
    if (selectedOrderItem !== null) {
      dispatch(removeItemFromOrderDetails(selectedOrderItem.itemId));
    }
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
            {selectedOrderItem.itemId && (
              <button
                onClick={() => {
                  handleremoveItemFromOrderDetails();
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
