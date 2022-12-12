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
  | "Gravy";

interface Ingredients {
  ingredient: Ingredient;
  selected: boolean;
  id?: string;
}

interface MenuItem {
  id: string;
  name: string;
  ingredients?: Ingredients[];
  price:number;
}

interface ReducerActionAdd {
  type: "add";
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

type ReducerAction = ReducerActionAdd | ReducerActionRemove | ReducerToggle;

interface ContextProvider {
  orderDetails: OrderDetails;
  dispatch: React.Dispatch<ReducerAction>;
  selectedOrderItem: MenuItem | null;
  setSelectedOrderItem: React.Dispatch<React.SetStateAction<MenuItem | null>>;
}

interface OrderDetails {
  tableNumber?: number;
  timeOrderPlaced?: Date;
  server?: string;
  orderItemDetails: MenuItem[];
}
