interface OrderDetails {
  orderId: string;
  tableNumber: string;
  timeOrderPlaced: number | null;
  server: string;
  orderItemDetails: MenuItem[];
  orderStatus: "pending" | "time up" | "ready";
}

type Station = "bar" | "salad" | "fry" | "grill" | "expeditor";

interface MenuItem {
  name: string;
  price: number;
  itemId: string;
  ingredients?: Ingredients[];
  isSentToKitchen?: boolean;
  station: Station;
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
  | "Mushrooms";

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

type Edits = string | AddExtraEdit | ToggleEdit;

interface AddExtraEdit {
  ingredientToAdd: Ingredients;
  itemID: string;
}

interface ToggleEdit {
  itemID: string;
  ingredientID: string;
}





interface Screens {
  value: {
    width: number;
    height: number;
  };
  label: string;
}
