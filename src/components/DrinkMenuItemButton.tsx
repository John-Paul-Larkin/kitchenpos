import styles from "../styles/MobileScreen.module.css";

import { menuContext } from "./MenuContext";
import React, { useContext } from "react";
import { motion } from "framer-motion";

export default function DrinkMenuItemButton({ item }: { item: MenuItem }) {
  const { dispatch } = useContext(menuContext);

  const handleMenuButtonClick = (item: MenuItem) => {
    dispatch({ type: "add new item to order", payload: item });
  };

  return (
    <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 1.05 }} className={styles["button"]} onClick={() => handleMenuButtonClick(item)}>
      <div className={styles["text-container"]}>{item.name}</div>
    </motion.div>
  );
}
