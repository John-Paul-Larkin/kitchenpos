import styles from "../styles/MenuItemButton.module.css";

import { menuContext } from "./MenuContext";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";

export default function MenuItemButton({ item }: { item: MenuItem }) {
  const { dispatch } = useContext(menuContext);

  const handleMenuButtonClick = (item: MenuItem) => {
    dispatch({ type: "add", payload: item });
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className={styles["button"]} onClick={() => handleMenuButtonClick(item)}>
      <div className={styles["text-container"]}>{item.name}</div>
    </motion.div>
  );
}
