import React from "react";

import "./App.css";
import MobileScreen from "./components/MobileScreen";
import useAddMenuItems from "./Helper/useAddMenuItems";

function App() {
  // useAddMenuItems();

  return (
    <div className="main-screen">
      <MobileScreen />
    </div>
  );
}

export default App;
