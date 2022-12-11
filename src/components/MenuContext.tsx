import { createContext, ReactNode, useState } from "react";
import uuid from "react-uuid";
import { useImmerReducer } from "use-immer";

export const menuContext = createContext({} as ContextProvider);

export default function MenuContext({ children }: { children: ReactNode }) {
  const [selectedOrderItem, setSelectedOrderItem] = useState<MenuItem | null>(null);

  const reducer = (draft: OrderDetails, action: ReducerAction): OrderDetails | undefined => {
    switch (action.type) {
      case "add": {
        const id = uuid();
        //create an id for the item, as the same item can be in the basket multiple times
        const item = { ...action.payload, id: id };
        //also create an id for each ingredient/option of that individul order item
        item.ingredients = item.ingredients!.map((cur) => {
          return { ...cur, id: uuid() };
        });
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
        setSelectedOrderItem(null);

        return draft;
      }

      case "toggleIngredient": {
        draft.orderItemDetails.forEach((item) =>
          item.ingredients?.forEach((ingredient) => {
            if (ingredient.id === action.payload) {
              ingredient.selected = !ingredient.selected;
            }
          })
        );

        if (selectedOrderItem && selectedOrderItem.ingredients) {
          const updatedIngredients = selectedOrderItem.ingredients.map((ingredient) => {
            if (ingredient.id === action.payload) {
              return { ...ingredient, selected: !ingredient.selected };
            }
            return ingredient;
          });
          setSelectedOrderItem({ ...selectedOrderItem, ingredients: updatedIngredients });
        }
        // setSelectedOrderItem(selectedOrderItem)
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
