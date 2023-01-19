import styles from "../styles/OrderScreen.module.css";

// Component Displays a list beside the item name.
// List contains default ingredients which have been deselected or..
// extra(non default) ingredients which have been added

export default function Alterations({ ingredients }: { ingredients: Ingredients[] | undefined }) {
  return (
    <span className={styles["order-alterations"]}>
      <div>
        {ingredients &&
          ingredients.map((ingredient) => {
            if (!ingredient.selected && !ingredient.added) {
              return <div key={ingredient.ingredientId}>No {ingredient.ingredient}</div>;
            } else if (ingredient.added && ingredient.selected) {
              return (
                <div key={ingredient.ingredientId} style={{ color: "yellow" }}>
                  Add {ingredient.ingredient}
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </span>
  );
}
