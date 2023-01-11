import styles from "../styles/MobileScreen.module.css";

import ScreenSizeSelector from "./ScreenSizeSelector";
import React, { useContext, useState } from "react";
import FoodMenuItemButton from "./FoodMenuItemButton";
import DrinkMenuItemButton from "./DrinkMenuItemButton";

import OrderScreen from "./OrderScreen";
import { foodMenuItems } from "../Helper/FoodMenuItems";
import { drinkMenuItems } from "../Helper/FoodMenuItems";

import Floorplan from "./Floorplan";
import { motion } from "framer-motion";
import { menuContext } from "./MenuContext";


export default function MobileScreen() {
  const screens = [
    { value: { width: 412, height: 914 }, label: "Samsung Galaxy S20FE - Width: 412 Height: 914  " },
    { value: { width: 360, height: 780 }, label: "Samsung Galaxy S22 - Width: 360 Height: 780    " },
    { value: { width: 390, height: 844 }, label: "Iphone 12 PRO - Width: 390 Height: 844        " },
  ];

  const [screen, setScreen] = useState<Screens | null>(screens[0]);

  const [isShowFoodMenu, setIsShowFoodMenu] = useState(true);

  const { isShowFloorPlan, loggedIn, setLoggedIn } = useContext(menuContext);


  return (
    <>
      {!loggedIn && <div>not logged in</div>}

      {loggedIn && (
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
                            <FoodMenuItemButton item={item} />
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
                            <DrinkMenuItemButton item={item} />
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
