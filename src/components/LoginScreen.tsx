import { Fade } from "react-awesome-reveal";
import waiter from "../Assets/waiter.png";
import useSignInAnon from "../Hooks/useSignInAnon";
import styles from "../styles/MobileScreen.module.css";

import { useRef, useState } from "react";
import ScreenSizeSelector from "./ScreenSizeSelector";

export default function LoginScreen({
  screen,
  setScreen,
  screens,
}: {
  screens: Screens[];
  screen: Screens | null;
  setScreen: React.Dispatch<React.SetStateAction<Screens | null>>;
}) {
  const [userName, setUserName] = useState("");

  const signInAnon = useSignInAnon();

  const handleRandomClick = () => {
    const serverNames = [
      "Aaran",
      "Mark",
      "Tony",
      "Brian",
      "Dermot",
      "Thomas",
      "John",
      "Andrew",
      "Andy",
      "Colin",
      "Brendan",
      "Lisa",
      "Jenny",
      "Tara",
      "Michelle",
      "Grace",
      "Nicola",
      "Lily",
      "Andrea",
      "Brigid",
      "Caroline",
      "Aoife",
      "Mary",
    ];

    const server = serverNames[Math.floor(Math.random() * serverNames.length)];
    setUserName(server);
  };

  const elementRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles["mobile-screen"]} style={{ width: screen?.value.width, height: screen?.value.height }}>
      <ScreenSizeSelector screen={screen} setScreen={setScreen} screens={screens} />

      <div className={styles["login-screen"]}>
        <div className={styles["server-name"]}>
          <img src={waiter} alt="waiter" />

          <div className={styles["intro"]}>
            <Fade>
              <h3>Welcome to restaurant POS</h3>
            </Fade>
            <Fade delay={1000}>
              <p>
                An app with a user-friendly interface, allowing waitstaff to input orders, customize menu items, and send orders through to the chefs
                in the kitchen.
              </p>
            </Fade>
          </div>

          <div className={styles["button-wrapper"]}>
            <button className={styles["random-button"]} onClick={handleRandomClick}>
              Random name
            </button>
            <br />
            <input
              className={styles["input"]}
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="or type a server name"
              ref={elementRef}
            />
            <br />

            <button
              className={styles["random-button"]}
              onClick={() => {
                if (userName) signInAnon(userName);
                else {
                  elementRef.current!.placeholder = "...enter a server name";

                  const id = setInterval(() => {
                    elementRef.current!.style.border === "3px solid black"
                      ? (elementRef.current!.style.border = "3px solid white")
                      : (elementRef.current!.style.border = "3px solid black");
                  }, 200);

                  setTimeout(() => {
                    clearInterval(id);
                    elementRef.current!.placeholder = "enter a name";
                  }, 1400);
                }
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
