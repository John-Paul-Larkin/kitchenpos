import { signInAnonymously, updateProfile } from "firebase/auth";
import { useContext } from "react";
import { menuContext } from "../Context/MenuContext";
import { auth } from "../Firebase/firebaseconfig";

export default function useSignInAnon() {
  const { setIsLoggedIn } = useContext(menuContext);

  return function signInAnon() {
    signInAnonymously(auth)
      .then(() => {
        setIsLoggedIn(true);

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
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
}
