import styles from "../styles/OrderScreen.module.css";

export default function Alterations({ ingredients }: { ingredients: Ingredients[] | undefined }) {
  return (
    <span className={styles["order-alterations"]}>
      <span>
        {ingredients &&
          ingredients.map((ingredient) => {
            if (!ingredient.selected) {
              return <div>No {ingredient.ingredient}</div>;
            } else {return <></>}

          
          })}
      </span>
    </span>
  );
}
