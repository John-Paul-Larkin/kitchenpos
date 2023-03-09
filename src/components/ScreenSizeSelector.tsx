import React from "react";
import Select from "react-select";

export default function ScreenSizeSelector({
  screen,
  setScreen,
  screens,
}: {
  screens: Screens[];
  screen: Screens | null;
  setScreen: React.Dispatch<React.SetStateAction<Screens | null>>;
}): JSX.Element {
  return (
    <div style={{ position: "absolute", zIndex: "1", top: "-70px" }}>
      <Select options={screens} value={screen} onChange={(option) => setScreen(option)} instanceId="screen select" />
    </div>
  );
}
