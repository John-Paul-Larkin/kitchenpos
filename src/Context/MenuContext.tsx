import { createContext, ReactNode, useState } from "react";
import uuid from "react-uuid";
import { useImmer, useImmerReducer } from "use-immer";
import { auth } from "../Firebase/firebaseconfig";

export default function MenuContext({ children }: { children: ReactNode }) {
  const [selectedOrderItem, setSelectedOrderItem] = useState<MenuItem | null>(null);
  const [selectedTableNumber, setSelectedTableNumber] = useState("1");
  const [openOrders, setOpenOrders] = useImmer([] as OrderDetails[]);
  const [isShowFloorPlan, setisShowFloorPlan] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [isShowCancelModal, setIsShowCancelModal] = useState(false);

  // The reducer orderDetails contains the information about the currently selected table.
  // An order is allocated an id when an it is sent to the kitchen
  // A single table can have multiple orders open at the same time
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
        // selected order item will have options displayed on the right of the screen

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
        return draft;
      }
      case "add order/time- strip out sentToKitchen ": {
        // adding id,server and time when order is sent through to firebase/kitchen
        draft.timeOrderPlaced = new Date();
        draft.orderId = uuid();
        if (auth.currentUser && auth.currentUser.displayName !== null) {
          draft.server = auth.currentUser.displayName;
        }
        // Strip out the items which have already been sent on previous orders.
        draft.orderItemDetails = draft.orderItemDetails.filter((item) => item.isSentToKitchen !== true);
        return draft;
      }
      case "clear order": {
        draft.tableNumber = "";
        draft.orderItemDetails = [];
        draft.server = "";
        draft.timeOrderPlaced = null;
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
          added: true,
          ingredientId: uuid(),
        };

        const itemID = selectedOrderItem?.itemId;

        if (selectedOrderItem?.isSentToKitchen === true) {
          // if the item is already sent

          setOpenOrders((draft) => {
            draft.forEach((order) =>
              order.orderItemDetails.forEach((item) => {
                if (item.itemId === itemID) {
                  item.ingredients?.push(ingredientoAdd);
                }
              })
            );
            return draft;
          });
        }

        // Add item to the current order details
        draft.orderItemDetails.forEach((item) => {
          if (item.itemId === itemID) {
            item.ingredients?.push(ingredientoAdd);
          }
        });

        if (selectedOrderItem !== null) {
          setSelectedOrderItem({ ...selectedOrderItem, ingredients: [...selectedOrderItem.ingredients!, ingredientoAdd] });
        }
        return draft;
      }

      default: {
        return draft;
      }
    }
  };

  const initialOrderDetails = {} as OrderDetails;
  const [orderDetails, dispatch] = useImmerReducer(reducer, initialOrderDetails);

  const contextValues = {
    orderDetails,
    dispatch,
    selectedOrderItem,
    setSelectedOrderItem,
    selectedTableNumber,
    setSelectedTableNumber,
    openOrders,
    setOpenOrders,
    isShowFloorPlan,
    setisShowFloorPlan,
    isLoggedIn,
    setIsLoggedIn,
    isShowCancelModal,
    setIsShowCancelModal,
  };

  return <menuContext.Provider value={contextValues}>{children}</menuContext.Provider>;
}

export const menuContext = createContext({} as ContextProvider);
