import { createContext, ReactNode, useState } from "react";
import { auth } from "../Firebase/firebaseconfig";

export default function MenuContext({ children }: { children: ReactNode }) {
  const [selectedTableNumber, setSelectedTableNumber] = useState("1");

  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);

  const [isShowFloorPlan, setisShowFloorPlan] = useState(true);
  const [isShowCancelModal, setIsShowCancelModal] = useState(false);

  const contextValues = {
    selectedTableNumber,
    setSelectedTableNumber,
    isShowFloorPlan,
    setisShowFloorPlan,
    isLoggedIn,
    setIsLoggedIn,
    isShowCancelModal,
    setIsShowCancelModal,
  };

  return <menuContext.Provider value={contextValues}>{children}</menuContext.Provider>;
}

export const menuContext = createContext({} as ContextProvider);
