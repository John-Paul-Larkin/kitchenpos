import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import db from "./firebaseconfig";

export function useGetMenuItems() {
  const [data, setData] = useState([] as MenuItem[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.count("in use get menu items component");

  useEffect(() => {
    const get = async () => {
      try {
        setLoading(true);
        const docRef = collection(db, "menu-items");
        const result = await getDocs(docRef);

        let outArr = [] as MenuItem[];
        result.forEach((res) => {
          const r = res.data() as MenuItem;
          outArr.push(r);
        });
        setData(() => outArr);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, []);

  return { menuItems: data, loading, error };
}
