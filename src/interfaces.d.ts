interface OrderDetails {
  orderId: string;
  tableNumber: string;
  server: string;
  orderItemDetails: MenuItem[];
  orderStatus: OrderStatus;
  timeOrderPlaced: number | null;
  timeTimeUp: number | null;
  timeReady: number | null;
  timeClosed: number | null;
}

type OrderStatus = "pending" | "time up" | "ready" | "closed";

type Station = "bar" | "salad" | "fry" | "grill" | "expeditor";

interface MenuItem {
  name: string;
  price: number;
  itemId: string;
  ingredients: Ingredients[];
  isSentToKitchen?: boolean;
  station: Station;
  // orderID?: string;
}
interface Ingredients {
  ingredient: Ingredient;
  selected: boolean;
  added?: boolean;
  ingredientId?: string;
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
  | "Mushrooms"
  | "Stuffing"
  | "Coleslaw"
  | "Rice";

// Context API types

interface ContextProvider {
  selectedTableNumber: string;
  setSelectedTableNumber: React.Dispatch<React.SetStateAction<string>>;

  isShowFloorPlan: boolean;
  setisShowFloorPlan: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCancelModal: boolean;
  setIsShowCancelModal: Dispatch<SetStateAction<boolean>>;
}

// Edit/reducer Types

type Edits = RemoveEdit | AddExtraEdit | ToggleEdit;

interface AddExtraEdit {
  ingredientToAdd: Ingredients;

  itemID: string;
  editType: "addExtraIngredientToOpenOrders";
}

interface ToggleEdit {
  itemID: string;
  ingredientID: string;
  editType: "toggleIngredientOpenOrders";
}

interface RemoveEdit {
  itemID: string;
  editType: "removeItemFromOpenOrders";
}

interface ChangeStatus {
  orderID: string;
  status: OrderStatus;
}

interface Screens {
  value: {
    width: number;
    height: number;
  };
  label: string;
}

interface Toggle {
  itemID: string;
  ingredientID: string;
}

interface AddIngredient {
  ingredientToAdd: Ingredients;
  itemID: string;
}

interface Remove {
  itemID: string;
}
