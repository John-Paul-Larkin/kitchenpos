import { Switch } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { setSelectedItemToEmpty, toggleIngredientOnSelectedItem } from "../features/selectedOrderItemSlice";
import styles from "../styles/OrderScreen.module.css";
import SelectExtraIngredients from "./SelectExtraIngredients";

import { removeItem, toggleIngredientOnOrderDetails } from "../features/orderDetailsSlice";

export default function OrderItemOptions() {
  const { setOpenOrders } = useContext(menuContext);

  const orderDetails = useAppSelector((state) => state.orderDetails);
  const selectedOrderItem = useAppSelector((state) => state.selectedOrderItem);

  const dispatch = useAppDispatch();

  const handleSwitchToggleIngredient = (ingredientId: string) => {
    // find the index of the item whose ingredient we want to toggle
    const indexOfItemToToggleIngredient = orderDetails.orderItemDetails.indexOf(
      orderDetails.orderItemDetails.find((item) => item.itemId === selectedOrderItem!.itemId)!
    );
    // check if the item has already been sent to the kitchen
    if (orderDetails.orderItemDetails[indexOfItemToToggleIngredient].isSentToKitchen === true) {
      const itemID = orderDetails.orderItemDetails[indexOfItemToToggleIngredient].itemId;

      // if it has locate the item  within the list of open orders
      // and toggle the ingredient to not selected

      setOpenOrders((draft) => {
        draft.forEach((order) =>
          order.orderItemDetails.forEach((item) => {
            if (item.itemId === itemID) {
              item.ingredients?.forEach((ingredient) => {
                if (ingredient.ingredientId === ingredientId) {
                  ingredient.selected = !ingredient.selected;
                }
              });
            }
          })
        );
        return draft;
      });
    }
    // Then toggle the item on the current order
    // dispatch({ type: "toggleIngredient", payload: ingredientId });
    dispatch(toggleIngredientOnOrderDetails(ingredientId));

    dispatch(toggleIngredientOnSelectedItem(ingredientId));
  };

  const handleRemoveItem = () => {
    if (selectedOrderItem?.isSentToKitchen === true) {
      setOpenOrders((draft) => {
        let orderID: string;
        // find the item in open orders and extract the order id
        draft.forEach((order) => {
          order.orderItemDetails.forEach((item) => {
            if (item.itemId === selectedOrderItem.itemId) {
              orderID = order.orderId;
            }
          });
        });

        draft.forEach((order) => {
          if (order.orderId === orderID) {
            // if there is only one item in the order, then we should completely remove the order
            if (order.orderItemDetails.length === 1) {
              draft = draft.filter((order) => order.orderId !== orderID);
            } else {
              // else just remove the item from the order
              order.orderItemDetails = order.orderItemDetails.filter((item) => {
                return item.itemId !== selectedOrderItem.itemId;
              });
            }
          }
        });

        return draft;
      });
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
