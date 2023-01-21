import MobileScreen from "./components/MobileScreen";
import MenuContext from "./Context/MenuContext";
import "./styles/App.css";
import { Provider } from "react-redux";
import store from './app/store'

function App() {
  return (
    <Provider store={store}>
    <MenuContext>
      <div className="main-screen">
        <MobileScreen />
      </div>
    </MenuContext>
    </Provider>
  );
}

export default App;
