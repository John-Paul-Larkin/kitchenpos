import produce from "immer";
import { createContext, ReactNode, useReducer } from "react";

export const menuContext = createContext({} as ContextProvider);

export default function MenuContext({ children }: { children: ReactNode }) {
  const reducer = (state: OrderDetails, action: ReducerAction): OrderDetails => {
    switch (action.type) {
      case "add": {
        let out = {} as OrderDetails;

        if (Object.keys(state).length === 0) {
          out = { tableNumber: 1, orderItemDetails: [{ ...action.payload, id: Math.random() }] };
        } else {
          out = { ...state, orderItemDetails: [...state.orderItemDetails, { ...action.payload, id: Math.random() }] };
        }
        console.log(state,'state')
        console.log(out)

        return out;
      }
      default:
        return state;
    }
  };

  const initialOrderDetails = {} as OrderDetails;

  const [orderDetails, dispatch] = useReducer(reducer, initialOrderDetails);

  return <menuContext.Provider value={{ orderDetails, dispatch }}>{children}</menuContext.Provider>;
}

// {
//   let out = {} as OrderDetails;

//   if (Object.keys(state).length === 0) {
//     out = { tableNumber: 1, orderItemDetails: [{ ...action.payload, id: Math.random() }] };
//   } else {
//     out = { ...state, orderItemDetails: [...state.orderItemDetails, { ...action.payload, id: Math.random() }] };
//   }

//   return out;
// }
