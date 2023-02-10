//
//
//
// Component not in use
//
// //
export {};
// import { motion } from "framer-motion";
// import React, { useContext } from "react";
// import { useStopwatch } from "react-timer-hook";
// import { menuContext } from "../Context/MenuContext";
// import { changeTableNumberOrderDetails } from "../features/orderDetailsSlice";
// import useChangeTableNumber from "../Hooks/useChangeTableNumber";
// import styles from "../styles/FloorPlan.module.css";

// import { differenceInSeconds } from "date-fns";
// import { useAppDispatch } from "../app/hooks";

// function Stopwatch({ orderTime }: { orderTime: Date }) {
//   const stopwatchOffset = new Date();
//   const timeNow = new Date();

//   stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + differenceInSeconds(timeNow, orderTime));

//   const { seconds, minutes } = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset });
//   return (
//     <div className={styles["stopwatch"]}>
//       {minutes}:{seconds}
//     </div>
//   );
// }

// export default function SingleFoodOrder({ order }: { order: OrderDetails }) {
//   const dispatch = useAppDispatch();
//   const { setisShowFloorPlan, setSelectedTableNumber } = useContext(menuContext);
//   const changeTableNumber = useChangeTableNumber();

//   const handleOpenOrderClick = () => {
//     setisShowFloorPlan(false);
//     dispatch(changeTableNumberOrderDetails(order.orderId));
//     changeTableNumber(order.tableNumber);
//     setSelectedTableNumber(order.tableNumber);
//   };

//   let borderColor = "3px solid red";

//   if (order.orderStatus === "ready") {
//     borderColor = "3px solid green";
//   }

//   const orderTimeDisplay = new Date(order.timeOrderPlaced!).toLocaleTimeString();
//   const orderTime = new Date(order.timeOrderPlaced!);

//   return (
//     <motion.div
//       whileHover={{ scale: 1.07 }}
//       whileTap={{ scale: 0.9 }}
//       className={styles["open-orders"]}
//       onClick={handleOpenOrderClick}
//       style={{ border: borderColor }}
//     >
//       <div className={styles["time-order-placed"]}>{orderTimeDisplay}</div>

//       <div className={styles["table-number"]}>{order.tableNumber}</div>
//       <Stopwatch orderTime={orderTime} />
//       <div>
//         {order.orderItemDetails.map((item) => {
//           if (item.station === "bar") {
//             return (
//               <div className={styles["items"]} key={item.itemId}>
//                 {item.name}
//               </div>
//             );
//           } else return null;
//         })}
//       </div>
//     </motion.div>
//   );
// }
