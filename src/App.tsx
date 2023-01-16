import MobileScreen from "./components/MobileScreen";
import MenuContext from "./Context/MenuContext";
import "./styles/App.css";

function App() {
  return (
    <MenuContext>
      <div className="main-screen">
        <MobileScreen />
      </div>
    </MenuContext>
  );
}

export default App;
