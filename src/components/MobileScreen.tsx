import styles from "./MobileScreen.module.css";
import ScreenSizeSelector from "./ScreenSizeSelector";
import React, { useState } from "react";

export default function MobileScreen() {
  const screens = [
    { value: { width: 360, height: 780 }, label: "Samsung Galaxy S22 - Width: 360 Height: 780    " },
    { value: { width: 390, height: 844 }, label: "Iphone 12 PRO - Width: 390 Height: 844        " },
    { value: { width: 412, height: 914 }, label: "Samsung Galaxy S20FE - Width: 412 Height: 914  " },
  ];

  const [screen, setScreen] = useState<Screens | null>(screens[0]);

 
  return (
    <>
      <div className={styles["mobile-screen"]} style={{ width: screen?.value.width, height: screen?.value.height }}>
        <ScreenSizeSelector screen={screen} setScreen={setScreen} screens={screens} />
        
      </div>
    </>
  );
}
