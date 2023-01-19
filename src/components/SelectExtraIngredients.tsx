import { useState } from "react";
import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ingredientsList } from "../Assets/FoodMenuItems";
import { addExtraIngredientOnOrderDetails } from "../features/orderDetailsSlice";
import { addExtraIngredientOnSelectedItem } from "../features/selectedOrderItemSlice";
import styles from "../styles/OrderScreen.module.css";

export default function SelectExtraIngredients() {
  // const [selectedIngredient, setselectedIngredient] = useState(ingredientsList[0]);
  const dispatch = useAppDispatch();
  const selectedOrderItem = useAppSelector((state) => state.selectedOrderItem);

  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // dispatch({ type: "Add extra ingredient", payload: e.target.value as Ingredient });

    const ingredientToAdd: Ingredients = {
      ingredient: e.target.value as Ingredient,
      selected: true,
      added: true,
      ingredientId: uuid(),
    };
    const itemID = selectedOrderItem.itemId;
    dispatch(addExtraIngredientOnOrderDetails({ ingredientToAdd, itemID }));

    dispatch(addExtraIngredientOnSelectedItem(ingredientToAdd));

    setShowIngredientDropdown(false);
  };

  const handleAddIngredient = () => {
    // dispatch({ type: "Add extra ingredient", payload: selectedIngredient });
    setShowIngredientDropdown(true);
  };

  return (
    <>
      {!showIngredientDropdown && <button onClick={handleAddIngredient}>Add extra</button>}

      {showIngredientDropdown && (
        <div>
          <form>
            <label htmlFor="ingredient-select"></label>
            <select className={styles["ingredient-select"]} onChange={(e) => handleSelectChange(e)}>
              <option value="" disabled selected>
                Select extra
              </option>
              {ingredientsList.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
      )}
    </>
  );
}
