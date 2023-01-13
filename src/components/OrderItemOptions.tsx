import { useContext } from "react";
import styles from "../styles/OrderScreen.module.css";
import { menuContext } from "./MenuContext";
import { Switch } from "@mui/material";
import SelectExtraIngredients from "./SelectExtraIngredients";

export default function OrderItemOptions() {
  const { setSelectedOrderItem, orderDetails, selectedOrderItem, dispatch, openOrders, setOpenOrders } = useContext(menuContext);

  const handleSwitchToggleIngredient = (ingredientId: string) => {
    // find the menu item object which mathches the id of item we want to edit
    const indexOfItemToToggleIngredient = orderDetails.orderItemDetails.indexOf(
      orderDetails.orderItemDetails.find((item) => item.itemId === selectedOrderItem!.itemId)!
    );
    // check if the item has already been sent to the kitchen
    if (orderDetails.orderItemDetails[indexOfItemToToggleIngredient].isSentToKitchen === true) {
      const itemID = orderDetails.orderItemDetails[indexOfItemToToggleIngredient].itemId;

      // if it has locate the item  within the list of open orders
      // and toggle the ingrdient to not selected

      setOpenOrders((curr) => {
        curr.forEach((order) =>
          order.orderItemDetails.forEach((item) => {
            if (item.itemId === itemID) {
              item.ingredients?.forEach((ingredient) => {
                if (ingredient.ingredientId === ingredientId) {
                  ingredient.selected = !ingredient.selected;
                  console.log(ingredient);
                }
              });
            }
          })
        );
        return curr;
      });
    }
    // Then toggle the item on the current order
    dispatch({ type: "toggleIngredient", payload: ingredientId });
  };

  const handleRemoveItem = () => {
    // find the menu item object which matches the id of item to remove
    const indexOfItemToRemove = orderDetails.orderItemDetails.indexOf(
      orderDetails.orderItemDetails.filter((item) => item.itemId === selectedOrderItem!.itemId)[0]
    );

    // check if the item has already been sent to the kitchen
    if (orderDetails.orderItemDetails[indexOfItemToRemove].isSentToKitchen === true) {
      const itemID = orderDetails.orderItemDetails[indexOfItemToRemove].itemId;
      const orderID = orderDetails.orderId;
      // if it has remove item from the array of open orders
      setOpenOrders((draft) => {
        let order = draft.find((order) => order.orderId === orderID)!;

        // if the item to be removed is the only item in the order
        if (order.orderItemDetails.length === 1) {
          // then remove the order completely
          draft = draft.filter((order) => order.orderId !== orderID);
          return draft;
        } else {
          // else just remove the item from the order
          order.orderItemDetails = order.orderItemDetails.filter((item) => item.itemId !== itemID);
          return draft;
        }
      });
    }

    // remove the item - this time from the list of items in the current order.
    dispatch({ type: "remove item", payload: selectedOrderItem!.itemId });
    if (orderDetails.orderItemDetails.length === 1 && indexOfItemToRemove === 0) {
      // if the removed item was the last remaining in the array => set selected to null
      setSelectedOrderItem(null);
    } else if (indexOfItemToRemove === 0) {
      // if its not the last item, but it is the first in the array. note position 1 as orderdetails state has not updated yet.
      setSelectedOrderItem(orderDetails.orderItemDetails[1]);
    } else {
      setSelectedOrderItem(orderDetails.orderItemDetails[indexOfItemToRemove - 1]);
    }
  };

  console.log(openOrders);

  return (
    <>
      <div className={styles["order-item-details"]}>
        <div className={styles["item-options"]}>Item options</div>
        <div className={styles["item-wrapper"]}>
          {selectedOrderItem && <h2>{selectedOrderItem.name}</h2>}
          {selectedOrderItem?.ingredients &&
            selectedOrderItem.ingredients.map((ingredient) => (
              <div key={ingredient.ingredientId} style={ingredient.selected ? {} : { color: "white" }}>
                {ingredient.ingredient}
                <Switch size="small" checked={ingredient.selected} onClick={() => handleSwitchToggleIngredient(ingredient.ingredientId!)} />
              </div>
            ))}
        </div>
        {selectedOrderItem && <SelectExtraIngredients />}

        <div className={styles["remove-button-wrapper"]}>
          <span className={styles["spacer"]}></span>
          <div className={styles["remove-button"]}>
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
        </div>
      </div>
    </>
  );
}
