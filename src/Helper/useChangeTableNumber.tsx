import { useContext } from "react";
import { menuContext } from "../components/MenuContext";

export default function useChangeTableNumber() {
  const { openOrders, dispatch, setTableNumber } = useContext(menuContext);

  function changeTableNumber(table: string) {
    //check if there are any orders already on the table
    const ordersAlreadyOnTable = openOrders.filter((orders) => orders.tableNumber === table);
    //if there are orders
    if (ordersAlreadyOnTable.length > 0) {
      let oldOrderItems = [] as MenuItem[];
      //take the items from those orders and put them in a new array
      ordersAlreadyOnTable.forEach((order) => order.orderItemDetails.forEach((item) => oldOrderItems.push(item)));

      // iterate through the already ordered items. marking each with a boolean to indicate item has already been sent
      // nescessary later when we need to add new orders to a table with open orders
      oldOrderItems = oldOrderItems.map((item) => {
        return { ...item, isSentToKitchen: true };
      });


      dispatch({ type: "add already ordered items", payload: oldOrderItems });
    }
 
    setTableNumber(table);
    dispatch({ type: "change table number", payload: table });
  }

  return changeTableNumber;
}
