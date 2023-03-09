import { signInAnonymously, updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext } from "react";
import { useAppDispatch } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { addOrderToOpenOrders } from "../features/openOrdersSlice";
import db, { auth } from "../Firebase/firebaseconfig";

export default function useSignInAnon() {
  const { setIsLoggedIn } = useContext(menuContext);
  const dispatch = useAppDispatch();

  return function signInAnon() {
    signInAnonymously(auth)
      .then(() => {
        setIsLoggedIn(true);

        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: "Timmy",
          })
            .then(() => {
              initDataFromFirestore().then((orders) => {
                orders.forEach((orderDetails) => {
                  dispatch(addOrderToOpenOrders(orderDetails));
                });
              });
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

async function initDataFromFirestore() {
  const q = query(collection(db, "orders"), where("orderStatus", "!=", "closed"));

  const data: OrderDetails[] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // const order = doc.data() as OrderDetails;
    // const timeNow = new Date().getTime();
    // const twentyMinutes = 1200000;
    // if (timeNow - order.timeOrderPlaced! > twentyMinutes) {
    //   data.push(order);
    // }

    data.push(doc.data() as OrderDetails);
  });

  return data;
}
