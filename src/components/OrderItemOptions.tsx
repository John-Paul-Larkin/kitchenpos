import { Switch } from "@mui/material";
import { useContext } from "react";
import styles from "../styles/OrderScreen.module.css";
import { menuContext } from "./MenuContext";
import SelectExtraIngredients from "./SelectExtraIngredients";

export default function OrderItemOptions() {
  const { setSelectedOrderItem, orderDetails, selectedOrderItem, dispatch, openOrders, setOpenOrders } = useContext(menuContext);

  const handleSwitchToggleIngredient = (ingredientId: string) => {
    // find the index of the item whose ingredient we want to toggle
    const indexOfItemToToggleIngredient = orderDetails.orderItemDetails.indexOf(
      orderDetails.orderItemDetails.find((item) => item.itemId === selectedOrderItem!.itemId)!
    );
    // check if the item has already been sent to the kitchen
    if (orderDetails.orderItemDetails[indexOfItemToToggleIngredient].isSentToKitchen === true) {
      const itemID = orderDetails.orderItemDetails[indexOfItemToToggleIngredient].itemId;

      // if it has locate the item  within the list of open orders
      // and toggle the ingrdient to not selected

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
    dispatch({ type: "toggleIngredient", payload: ingredientId });
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
              console.log("selected1", selectedOrderItem.itemId);
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
    dispatch({ type: "remove item", payload: selectedOrderItem!.itemId });
    if (orderDetails.orderItemDetails.length === 1) {
      // if the removed item was the last remaining in the array => set selected to null
      setSelectedOrderItem(null);
      // } else if (indexOfItemToRemove === 0) {
      //   // if its not the last item, but it is the first in the array. note position 1 as orderdetails state has not updated yet.
      //   setSelectedOrderItem(orderDetails.orderItemDetails[1]);
    } else {
      setSelectedOrderItem(orderDetails.orderItemDetails[0]);
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
