import { createContext, ReactNode, useState } from "react";
import uuid from "react-uuid";
import { useImmer, useImmerReducer } from "use-immer";

export const menuContext = createContext({} as ContextProvider);

export default function MenuContext({ children }: { children: ReactNode }) {
  const [selectedOrderItem, setSelectedOrderItem] = useState<MenuItem | null>(null);
  const [tableNumber, setTableNumber] = useState("1");
  const [openOrders, setOpenOrders] = useImmer([] as OrderDetails[]);
  const [isShowFloorPlan, setisShowFloorPlan] = useState(true);

  const reducer = (draft: OrderDetails, action: ReducerAction): OrderDetails | undefined => {
    switch (action.type) {
      case "add new item to order": {
        const id = uuid();
        //create an id for the item, as the same item can be in the basket multiple times
        const item = { ...action.payload, itemId: id };
        //also create an id for each ingredient/option of that individul order item
        item.ingredients = item.ingredients!.map((cur) => {
          return { ...cur, ingredientId: uuid() };
        });
        if (Object.keys(draft).length === 0 || draft.orderItemDetails === undefined) {
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
      case "add already ordered items": {
        // adds any items which are already open on a table
        // when user opens that table again
        draft.orderItemDetails = action.payload;
        return draft;
      }
      case "add transfered items": {
        draft.orderItemDetails = [...draft.orderItemDetails, ...action.payload];
        return draft;
      }
      case "remove item": {
        draft.orderItemDetails = draft.orderItemDetails.filter((item) => item.itemId !== action.payload);
        return draft;
      }
      case "change table number": {
        draft.tableNumber = action.payload;
        setTableNumber(action.payload);
        return draft;
      }
      case "add order/time- strip out sentToKitchen ": {
        // adding id and time when order is sent through to firebase/kitchen
        draft.timeOrderPlaced = new Date();
        draft.orderId = uuid();
        // Strip out the items which have already been sent on previous orders.
        draft.orderItemDetails = draft.orderItemDetails.filter((item) => item.isSentToKitchen !== true);
        return draft;
      }
      case "clear order": {
        draft.tableNumber = "";
        draft.orderItemDetails = [];
        draft.server = "";
        draft.timeOrderPlaced = null;
        setSelectedOrderItem(null);

        return draft;
      }
      case "toggleIngredient": {
        //iterate through the items in the order, on finding the specified option, negate it.
        draft.orderItemDetails.forEach((item) =>
          item.ingredients?.forEach((ingredient) => {
            if (ingredient.ingredientId === action.payload) {
              ingredient.selected = !ingredient.selected;
            }
          })
        );

        // Update the selected order item - ie the item ingredients details screen

        if (selectedOrderItem && selectedOrderItem.ingredients) {
          const updatedIngredients = selectedOrderItem.ingredients.map((ingredient) => {
            if (ingredient.ingredientId === action.payload) {
              return { ...ingredient, selected: !ingredient.selected };
            }
            return ingredient;
          });
          setSelectedOrderItem({ ...selectedOrderItem, ingredients: updatedIngredients });
        }
        return draft;
      }
      case "Add extra ingredient": {
        const ingredientoAdd: Ingredients = {
          ingredient: action.payload,
          selected: true,
          added:true,
          ingredientId: uuid(),
        };
        const id = selectedOrderItem?.itemId;

        draft.orderItemDetails.forEach((item) => {
          if (item.itemId === id) {
            item.ingredients?.push(ingredientoAdd);
          }
        });
        if(selectedOrderItem !== null){
        setSelectedOrderItem({ ...selectedOrderItem, ingredients: [...selectedOrderItem.ingredients!,ingredientoAdd ]});
      }
        return draft;
      }

      default:
        return draft;
    }
  };

  const initialOrderDetails = {} as OrderDetails;

  const [orderDetails, dispatch] = useImmerReducer(reducer, initialOrderDetails);

  const contextValues = {
    orderDetails,
    dispatch,
    selectedOrderItem,
    setSelectedOrderItem,
    tableNumber,
    setTableNumber,
    openOrders,
    setOpenOrders,
    isShowFloorPlan,
    setisShowFloorPlan,
  };

  return <menuContext.Provider value={contextValues}>{children}</menuContext.Provider>;
}
