import { useAppDispatch } from "../app/hooks";
import { addNewItemToOrder } from "../features/orderDetailsSlice";
import { setSelectedOrderItem } from "../features/selectedOrderItemSlice";

import { motion } from "framer-motion";
import uuid from "react-uuid";
import styles from "../styles/MobileScreen.module.css";

export default function MenuItemButton({ item }: { item: MenuItem }) {
  const dispatch = useAppDispatch();

  const handleMenuButtonClick = (item: MenuItem) => {
    // dispatch({ type: "add new item to order", payload: item });

    const id = uuid();
    //create an id for the item, as the same item can be in the basket multiple times
    item = { ...item, itemId: id };
    //also create an id for each ingredient/option of that individul order item
    item.ingredients = item.ingredients!.map((cur) => {
      return { ...cur, ingredientId: uuid() };
    });

    dispatch(addNewItemToOrder(item));
    // selected order item will have options displayed on the right of the screen
    // setSelectedOrderItem(item);
    dispatch(setSelectedOrderItem(item));
  };

  return (
    <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 1.05 }} className={styles["button"]} onClick={() => handleMenuButtonClick(item)}>
      <div className={styles["text-container"]}>{item.name}</div>
    </motion.div>
  );
}
