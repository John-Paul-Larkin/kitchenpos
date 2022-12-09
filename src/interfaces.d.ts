// Mobile screens
interface Screens {
  value: {
    width: number;
    height: number;
  };
  label: string;
}

type Ingredients = "White bread" | "Butter" | "Bacon" | "Lettuce" | "Tomato" | "Cheese" | "Onion" | "Chicken" | "Ham" | "Mayo";

interface MenuItem {
  name: string;
  ingredients?: Ingredients[];
  id: number;
}

interface ReducerActionAdd {
  type: "add";
  payload: MenuItem;
}

interface ReducerActionRemove {
  type: 'remove';
  payload: number;
}

type ReducerAction = ReducerActionAdd | ReducerActionRemove;

interface ContextProvider {
  orderDetails: OrderDetails;
  dispatch: React.Dispatch<ReducerAction>;
}

interface OrderDetails {
  tableNumber?: number;
  timeOrderPlaced?: Date;
  server?: string;
  orderItemDetails: MenuItem[];
}
