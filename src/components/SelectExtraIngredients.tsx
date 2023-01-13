import { useContext, useState } from "react";
import { ingredientsList } from "../Helper/FoodMenuItems";
import styles from "../styles/OrderScreen.module.css";
import { menuContext } from "./MenuContext";

export default function SelectExtraIngredients() {
  const [selectedIngredient, setselectedIngredient] = useState(ingredientsList[0]);

  const { dispatch } = useContext(menuContext);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedIngredient(e.target.value as Ingredient);
  };

  const handleAddIngredient = () => {
    dispatch({ type: "Add extra ingredient", payload: selectedIngredient });
  };

  return (
    <div>
      <form>
        <label htmlFor="ingredient-select">
          <div>Add ingredient</div>
        </label>
        <select value={selectedIngredient} className={styles["ingredient-select"]} onChange={(e) => handleSelectChange(e)}>
          {ingredientsList.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </form>
      <button onClick={handleAddIngredient}>Add</button>
    </div>
  );
}
