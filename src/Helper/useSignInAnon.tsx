import { useContext } from "react";
import { menuContext } from "../components/MenuContext";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { auth } from "./firebaseconfig";

export default function useSignInAnon() {
  const { setIsLoggedIn } = useContext(menuContext);

  return function signInAnon() {
    signInAnonymously(auth)
      .then(() => {
        setIsLoggedIn(true);

        console.log(auth.currentUser?.displayName);
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: "Tom",
          })
            .then(() => {
              console.log("profile updated");
            })
            .catch((error) => {
              // An error occurred
              // ...
              console.log(error);
            });
          console.log(auth.currentUser.displayName);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
}
