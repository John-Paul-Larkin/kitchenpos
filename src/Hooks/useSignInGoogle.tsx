import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { menuContext } from "../Context/MenuContext";
import { auth, provider } from "../Firebase/firebaseconfig";

export default function useSignInGoogle() {
  const { setIsLoggedIn } = useContext(menuContext);

  return function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // // ...
        // console.log(token, user);
        setIsLoggedIn(true);
        console.log("google", auth.currentUser!.displayName);
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(errorMessage);
      });
  };
}
