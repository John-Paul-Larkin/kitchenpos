import { useState } from "react";
import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ingredientsList } from "../Assets/FoodMenuItems";
import { addExtraIngredientOnOrderDetails } from "../features/orderDetailsSlice";
import { addExtraIngredientOnSelectedItem } from "../features/selectedOrderItemSlice";
import { addNewEdit } from "../features/unsentOrderEditsSlice";
import styles from "../styles/OrderScreen.module.css";

export default function SelectExtraIngredients() {
  // const [selectedIngredient, setselectedIngredient] = useState(ingredientsList[0]);????????????????????????????
  const dispatch = useAppDispatch();
  const selectedOrderItem = useAppSelector((state) => state.selectedOrderItem);

  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ingredientToAdd: Ingredients = {
      ingredient: e.target.value as Ingredient,
      selected: true,
      added: true,
      ingredientId: uuid(),
    };
    const itemID = selectedOrderItem.itemId;

    dispatch(addExtraIngredientOnOrderDetails({ ingredientToAdd, itemID }));
    dispatch(addExtraIngredientOnSelectedItem(ingredientToAdd));

    if (selectedOrderItem.isSentToKitchen === true) {
      // dispatch(addExtraIngredientToOpenOrders({ ingredientToAdd, itemID }));

      dispatch(addNewEdit({ ingredientToAdd, itemID, editType: "addExtraIngredientToOpenOrders" }));
    }

    setShowIngredientDropdown(false);
  };

  const handleAddIngredient = () => {
    setShowIngredientDropdown(true);
  };

  return (
    <>
      {selectedOrderItem.itemId && (
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
      )}
    </>
  );
}
