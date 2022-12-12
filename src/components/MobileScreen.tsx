import styles from "../styles/MobileScreen.module.css";
import ScreenSizeSelector from "./ScreenSizeSelector";
import React, { useState } from "react";
import MenuItemButton from "./MenuItemButton";
import OrderScreen from "./OrderScreen";
import initialMenuItemsList from "../Helper/InitialMenuItems";
import Floorplan from "./Floorplan";
import { motion } from "framer-motion";

export default function MobileScreen() {
  const screens = [
    { value: { width: 360, height: 780 }, label: "Samsung Galaxy S22 - Width: 360 Height: 780    " },
    { value: { width: 390, height: 844 }, label: "Iphone 12 PRO - Width: 390 Height: 844        " },
    { value: { width: 412, height: 914 }, label: "Samsung Galaxy S20FE - Width: 412 Height: 914  " },
  ];

  const [screen, setScreen] = useState<Screens | null>(screens[0]);

  const menuItems = initialMenuItemsList;

  const [isShowFloorPlan, setisShowFloorPlan] = useState(true);

  return (
    <>
      {!isShowFloorPlan && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut" }}
          className={styles["mobile-screen"]}
          style={{ width: screen?.value.width, height: screen?.value.height }}
        >
          <ScreenSizeSelector screen={screen} setScreen={setScreen} screens={screens} />

          <OrderScreen />

          <div className={styles["grid-wrapper"]}>
            <div className={styles["button-grid"]}>
              {menuItems &&
                menuItems.map((item) => {
                  return (
                    <div key={item.id}>
                      <MenuItemButton item={item} />
                    </div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      )}

      {isShowFloorPlan && (
        <div className={styles["mobile-screen"]} style={{ width: screen?.value.width, height: screen?.value.height }}>
          <Floorplan setisShowFloorPlan={setisShowFloorPlan} />
        </div>
      )}
    </>
  );
}
