import styles from "../styles/OrderScreen.module.css";

export default function Alterations({ ingredients }: { ingredients: Ingredients[] | undefined }) {
  return (
    <span className={styles["order-alterations"]}>
      <div>
        {ingredients &&
          ingredients.map((ingredient) => {
            if (!ingredient.selected) {
              return <div key={ingredient.ingredientId}>No {ingredient.ingredient}</div>;
            } else {
              return null;
            }
          })}
      </div>
    </span>
  );
}
