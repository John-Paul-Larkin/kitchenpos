import styles from "../styles/MobileScreen.module.css";

import { useContext, useEffect, useState } from "react";
import MenuItemButton from "./MenuItemButton";
import ScreenSizeSelector from "./ScreenSizeSelector";

import { drinkMenuItems, foodMenuItems } from "../Assets/FoodMenuItems";
import OrderScreen from "./OrderScreen";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { useAppDispatch } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { addUpdatedOrdersToOpenOrders, closeOrders } from "../features/openOrdersSlice";
import db from "../Firebase/firebaseconfig";
import Floorplan from "./Floorplan";
import LoginScreen from "./LoginScreen";

export default function MobileScreen() {
  const screens = [
    { value: { width: 412, height: 914 }, label: "Samsung Galaxy S20FE - Width: 412 Height: 914  " },
    { value: { width: 360, height: 780 }, label: "Samsung Galaxy S22 - Width: 360 Height: 780    " },
    { value: { width: 390, height: 844 }, label: "Iphone 12 PRO - Width: 390 Height: 844        " },
  ];

  const [screen, setScreen] = useState<Screens | null>(screens[0]);

  const [isShowFoodMenu, setIsShowFoodMenu] = useState(true);

  const { isShowFloorPlan, isLoggedIn } = useContext(menuContext);

  // const signInGoogle = useSignInGoogle();

  const dispatch = useAppDispatch();

  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), where("orderStatus", "!=", "closed"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let orders: OrderDetails[] = [];

      querySnapshot.forEach((doc) => {
        // ----
        const order = doc.data() as OrderDetails;
        const timeNow = new Date().getTime();
        const twentyMinutes = 1200000;
        if (timeNow - order.timeOrderPlaced! < twentyMinutes) {
          orders.push(order);
        }
        // ----

        // orders.push(doc.data() as OrderDetails);
      });
      setOrders([...orders]);
    });

    return () => unsubscribe();
  }, []);

  dispatch(addUpdatedOrdersToOpenOrders(orders));

  dispatch(closeOrders(orders));

  return (
    <>
      {!isLoggedIn && <LoginScreen screen={screen} />}

      {isLoggedIn && (
        <>
          <div style={{ display: isShowFloorPlan ? "none" : "initial" }}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut" }}
              className={styles["mobile-screen"]}
              style={{ width: screen?.value.width, height: screen?.value.height }}
            >
              <ScreenSizeSelector screen={screen} setScreen={setScreen} screens={screens} />

              <OrderScreen />

              {isShowFoodMenu && (
                <div className={styles["grid-wrapper-bar"]}>
                  <div className={styles["button-grid"]}>
                    <motion.div
                      whileHover={{ scale: 0.9 }}
                      whileTap={{ scale: 1.05 }}
                      className={styles["button-drink"]}
                      onClick={() => setIsShowFoodMenu(false)}
                    >
                      <div className={styles["text-container"]}>BAR MENU</div>
                    </motion.div>
                    {foodMenuItems &&
                      foodMenuItems.map((item) => {
                        return (
                          <div key={item.itemId}>
                            <MenuItemButton item={item} />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {!isShowFoodMenu && (
                <div className={styles["grid-wrapper-food"]}>
                  <div className={styles["button-grid"]}>
                    <motion.div
                      whileHover={{ scale: 0.9 }}
                      whileTap={{ scale: 1.05 }}
                      className={styles["button-food"]}
                      onClick={() => setIsShowFoodMenu(true)}
                    >
                      <div className={styles["text-container"]}>FOOD MENU</div>
                    </motion.div>
                    {drinkMenuItems &&
                      drinkMenuItems.map((item) => {
                        return (
                          <div key={item.itemId}>
                            <MenuItemButton item={item} />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          <div style={{ display: isShowFloorPlan ? "initial" : "none" }}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut" }}
              className={styles["mobile-screen"]}
              style={{ width: screen?.value.width, height: screen?.value.height }}
            >
              <Floorplan />
            </motion.div>
          </div>
        </>
      )}
    </>
  );
}
