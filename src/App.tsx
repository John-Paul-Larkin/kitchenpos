import React from "react";

import "./App.css";
import MenuContext from "./components/MenuContext";
import MobileScreen from "./components/MobileScreen";

function App() {
  // useAddMenuItems();

  return (
    <MenuContext>
      <div className="main-screen">
        <MobileScreen />
      </div>
    </MenuContext>
  );
}

export default App;
