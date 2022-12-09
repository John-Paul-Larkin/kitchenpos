import { createContext, ReactNode } from "react";
import { useImmerReducer } from "use-immer";

export const menuContext = createContext({} as ContextProvider);

export default function MenuContext({ children }: { children: ReactNode }) {
  const reducer = (draft: OrderDetails, action: ReducerAction): OrderDetails => {
    switch (action.type) {
      case "add": {
        if (Object.keys(draft).length === 0) {
          // If this is the first item to be added to the order, just add to the array
          draft.orderItemDetails = [{ ...action.payload, id: Math.random() }];
        } else {
          //otherwise spread the old items before adding
          draft.orderItemDetails = [...draft.orderItemDetails, { ...action.payload, id: Math.random() }];
        }
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

  return <menuContext.Provider value={{ orderDetails, dispatch }}>{children}</menuContext.Provider>;
}
