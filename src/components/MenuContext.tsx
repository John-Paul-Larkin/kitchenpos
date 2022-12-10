import { createContext, ReactNode, useState } from "react";
import { useImmerReducer } from "use-immer";

export const menuContext = createContext({} as ContextProvider);

export default function MenuContext({ children }: { children: ReactNode }) {
  const [selectedOrderItem, setSelectedOrderItem] = useState<MenuItem | null>(null);

  const reducer = (draft: OrderDetails, action: ReducerAction): OrderDetails => {
    switch (action.type) {
      case "add": {
        const id = Math.floor(Math.random() * 10000);
        //create an id for the item, as the same item can be in the basket multiple times
        const item = { ...action.payload, id: id };
        if (Object.keys(draft).length === 0) {
          // If this is the first item to be added to the order, just add to the array
          draft.orderItemDetails = [item];
        } else {
          //otherwise spread the old items before adding
          draft.orderItemDetails = [...draft.orderItemDetails, item];
        }
        // selected order item will have options displayed on the left of the screen
        setSelectedOrderItem(item);

        return draft;
      }
      case "remove": {
        draft.orderItemDetails = draft.orderItemDetails.filter((item) => item.id !== action.payload);
        return draft;
      }

      default:
        return draft;
    }
  };

  const initialOrderDetails = {} as OrderDetails;

  const [orderDetails, dispatch] = useImmerReducer(reducer, initialOrderDetails);

  const contextValues = { orderDetails, dispatch, selectedOrderItem, setSelectedOrderItem };

  return <menuContext.Provider value={contextValues}>{children}</menuContext.Provider>;
}
