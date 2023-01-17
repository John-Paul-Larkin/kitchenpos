import { useContext, useState } from "react";
import { ingredientsList } from "../Assets/FoodMenuItems";
import { menuContext } from "../Context/MenuContext";
import styles from "../styles/OrderScreen.module.css";

export default function SelectExtraIngredients() {
  // const [selectedIngredient, setselectedIngredient] = useState(ingredientsList[0]);

  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);

  const { dispatch } = useContext(menuContext);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "Add extra ingredient", payload: e.target.value as Ingredient });
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