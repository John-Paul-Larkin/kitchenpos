// Mobile screens
interface Screens {
  value: {
    width: number;
    height: number;
  };
  label: string;
}


type Ingredient =
  | "White bread"
  | "Butter"
  | "Bacon"
  | "Lettuce"
  | "Tomato"
  | "Cheese"
  | "Onion"
  | "Chicken"
  | "Ham"
  | "Mayo"
  | "Pepper sauce"
  | "Onion rings"
  | "Ketchup"
  | "Fried onions"
  | "Parmesan"
  | "Croutons"
  | "Blue cheese dip"
  | "Side salad"
  | "Celery"
  | "Mushy peas"
  | "Lemon"
  | "Dill sauce"
  | "Pastry"
  | "Gravy"
  | "Mushrooms";

interface Ingredients {
  ingredient: Ingredient;
  selected: boolean;
  ingredientId?: string;
}

interface MenuItem {
  name: string;
  price: number;
  itemId: string;
  ingredients?: Ingredients[];
  isSentToKitchen?: boolean;
}

interface ReducerActionAdd {
  type: "add new item to order";
  payload: MenuItem;
}

interface ReducerActionRemove {
  type: "remove";
  payload: string;
}

interface ReducerToggle {
  type: "toggleIngredient";
  payload: string;
}

interface ReducerChangeTableNumber {
  type: "change table number";
  payload: string;
}

interface ReducerAddOrderTime {
  type: "add order/time- strip out sentToKitchen ";
}

interface ReducerAddOrdered {
  type: "add already ordered items";
  payload: MenuItem[];
}

interface ReducerClearOrder {
  type: "clear order";
}

type ReducerAction =
  | ReducerActionAdd
  | ReducerActionRemove
  | ReducerToggle
  | ReducerChangeTableNumber
  | ReducerAddOrderTime
  | ReducerClearOrder
  | ReducerAddOrdered;

interface ContextProvider {
  orderDetails: OrderDetails;
  dispatch: React.Dispatch<ReducerAction>;
  selectedOrderItem: MenuItem | null;
  setSelectedOrderItem: React.Dispatch<React.SetStateAction<MenuItem | null>>;
  tableNumber: string;
  setTableNumber: React.Dispatch<React.SetStateAction<string>>;
  openOrders: OrderDetails[];
  setOpenOrders: React.Dispatch<React.SetStateAction<OrderDetails[]>>;
  isShowFloorPlan: boolean;
  setisShowFloorPlan:React.Dispatch<React.SetStateAction<boolean>>
}

interface OrderDetails {
  tableNumber: string;
  timeOrderPlaced: Date | null;
  server?: string;
  orderItemDetails: MenuItem[];
  orderId: string;
}
