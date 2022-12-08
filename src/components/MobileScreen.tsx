import styles from "../styles/MobileScreen.module.css";
import ScreenSizeSelector from "./ScreenSizeSelector";
import React, { useState } from "react";
import { useGetMenuItems } from "../Helper/useGetMenuItems";
import MenuItemButton from "./MenuItemButton";
import OrderScreen from "./OrderScreen";

export default function MobileScreen() {
  const screens = [
    { value: { width: 360, height: 780 }, label: "Samsung Galaxy S22 - Width: 360 Height: 780    " },
    { value: { width: 390, height: 844 }, label: "Iphone 12 PRO - Width: 390 Height: 844        " },
    { value: { width: 412, height: 914 }, label: "Samsung Galaxy S20FE - Width: 412 Height: 914  " },
  ];

  const [screen, setScreen] = useState<Screens | null>(screens[0]);

  const { menuItems, loading, error } = useGetMenuItems();

  menuItems.forEach((element) => {
    console.log(typeof element.id,element.id);
  });
  console.log("ddddddddddddddddddddddddddddddddd");

  return (
    <>
      <div className={styles["mobile-screen"]} style={{ width: screen?.value.width, height: screen?.value.height }}>
        <ScreenSizeSelector screen={screen} setScreen={setScreen} screens={screens} />
        
        <OrderScreen />
        {loading && <div>Loading...</div>}
        <div className={styles["button-wrapper"]}>
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
    </>
  );
}
