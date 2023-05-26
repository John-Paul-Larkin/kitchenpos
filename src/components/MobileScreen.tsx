import styles from "../styles/MobileScreen.module.css";

import { useContext, useEffect, useState } from "react";
import MenuItemButton from "./MenuItemButton";
import ScreenSizeSelector from "./ScreenSizeSelector";

import { drinkMenuItems, foodMenuItems } from "../Assets/FoodMenuItems";
import OrderScreen from "./OrderScreen";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { menuContext } from "../Context/MenuContext";
import db from "../Firebase/firebaseconfig";
import { useAppDispatch } from "../app/hooks";
import { addUpdatedOrdersToOpenOrders, closeOrders } from "../features/openOrdersSlice";
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
  // const [readyTables, setReadyTables] = useState<number[]>([]);
  const [showNotification, setShowNotificaiton] = useState(false);

  useEffect(() => {
    // firstore snapshot which listens for an order status change to ready
    // then displays a notification to the user

    const q = query(collection(db, "orders"), where("orderStatus", "==", "ready"));
    let timeOutId: NodeJS.Timeout;
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // const order = doc.data() as OrderDetails;
        if (change.type === "added") {
          const order = change.doc.data() as OrderDetails;
          console.log(order.tableNumber);
          setShowNotificaiton(true);
          timeOutId = setTimeout(() => setShowNotificaiton(false), 3000);
        }
      });
    });
    return () => {
      unsubscribe();
      clearTimeout(timeOutId);
    };
  }, []);

  useEffect(() => {
    // when app first runs query firestore for any open orders.
    // we only select those which are less than twenty mins old
    // and the others will have order status changed to closed.

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
      {showNotification && <div>Order ready notification</div>}

      {!isLoggedIn && <LoginScreen screen={screen} setScreen={setScreen} screens={screens} />}
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
