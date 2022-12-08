import { createContext, ReactNode, useReducer } from "react";

export const menuContext = createContext({} as ContextProvider);

export default function MenuContext({ children }: { children: ReactNode }) {
  const reducer = (state: MenuItem[], action: ReducerAction): MenuItem[] => {
    switch (action.type) {
      case "add":
        return [...state, { ...action.payload, id: Math.random() }];
      default:
        return state;
    }
  };

  const initialOrderDetails = [] as MenuItem[];

  const [orderDetails, dispatch] = useReducer(reducer, initialOrderDetails);

  return <menuContext.Provider value={{ orderDetails, dispatch }}>{children}</menuContext.Provider>;
}
