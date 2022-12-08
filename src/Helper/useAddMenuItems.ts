import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import db from "./firebaseconfig";

export default function useAddMenuItems() {
  useEffect(() => {
    const set = async () => {
      await setDoc(doc(db, "menu-items", "B.L.T."), {
        ingredients: ["White bread", "Butter", "Bacon", "Lettuce", "Tomato"],
      });
    };
    set();
  }, []);
}
