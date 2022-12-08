import styles from "../styles/MenuItemButton.module.css";

import { menuContext } from "./MenuContext";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";

export default function MenuItemButton({ item }: { item: MenuItem }) {
  const { dispatch } = useContext(menuContext);
  const [isShowIndividualOrderItemIngredients, setIsShowIndividualOrderItemIngredients] = useState(false);
  const [isLrgButton, setIslrgButton] = useState(false);

  const handleMenuButtonClick = (item: MenuItem) => {
    // setIslrgButton((current) => !current);
    // setIsShowIndividualOrderItemIngredients((current) => !current);
    dispatch({ type: "add", payload: item });
  };

  return (
    <div className={isLrgButton ? styles["large-button"] : styles["button"]} onClick={() => handleMenuButtonClick(item)}>
      {item.name}
      {isShowIndividualOrderItemIngredients && item.ingredients?.map((ingredient, index) => <div key={index}>{ingredient}</div>)}
    </div>
  );
}
