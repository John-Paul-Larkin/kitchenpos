import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { addPreviouslySentItemsToOrderDetails, changeTableNumberOrderDetails } from "../features/orderDetailsSlice";

export default function useChangeTableNumber() {
  const { setSelectedTableNumber } = useContext(menuContext);

  const openOrders = useAppSelector((state) => state.openOrders);

  const dispatch = useAppDispatch();

  function changeTableNumber(table: string) {
    //check if there are any sent items already on the table
    const ordersAlreadyOnTable = openOrders.filter((orders) => orders.tableNumber === table);
    //if there are sent items
    if (ordersAlreadyOnTable.length > 0) {
      let oldOrderItems = [] as MenuItem[];
      //take the items from those orders and put them in a new array
      ordersAlreadyOnTable.forEach((order) => order.orderItemDetails.forEach((item) => oldOrderItems.push(item)));

      // iterate through the already ordered items. marking each with a boolean to indicate item has already been sent
      // nescessary later when we need to add new orders to a table with open orders
      oldOrderItems = oldOrderItems.map((item) => {
        return { ...item, isSentToKitchen: true };
      });

      dispatch(addPreviouslySentItemsToOrderDetails(oldOrderItems));
    }

    setSelectedTableNumber(table);

    dispatch(changeTableNumberOrderDetails(table));
  }

  return changeTableNumber;
}
