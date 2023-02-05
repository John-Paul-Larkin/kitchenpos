import styles from "../styles/FloorPlan.module.css";
import SingleCompleteOrder from "./SingleCompleteOrder";

import { useState } from "react";
import { useAppSelector } from "../app/hooks";

export default function TableDrawing({
  tableNumber,
  numberOfseats,
  handleTableClick,
}: {
  tableNumber: string;
  numberOfseats: number;
  handleTableClick: (table: string) => void;
}) {
  const openOrders = useAppSelector((state) => state.openOrders);

  console.log(openOrders); 

  let tableColor = "black";

  // console.log(tableColor);

  openOrders.forEach((order) => {
    if (order.tableNumber === tableNumber) {
      if (order.orderStatus === "pending") {
        tableColor = "red";
      } else if (order.orderStatus === "time up") {
        tableColor = "orange";
      } else if (order.orderStatus === "ready") {
        tableColor = "green";
      }
    }
  });

  const [isShowTableDetails, setIsShowTableDetails] = useState(false);

  const checkIsTableOpen = () => {
    const order = openOrders.find((order) => order.tableNumber === tableNumber);

    if (order && order.orderItemDetails.length > 0) setIsShowTableDetails(true);
  };

  return (
    <>
      {numberOfseats === 4 && (
        <div className={styles["table-container"]} onMouseEnter={() => checkIsTableOpen()} onMouseLeave={() => setIsShowTableDetails(false)}>
          {isShowTableDetails && <SingleCompleteOrder tableNumber={tableNumber} />}
          <span className={styles[`table-${tableNumber}`]} onClick={() => handleTableClick(tableNumber)}>
            <span className={`${styles["table-num"]}  ${styles[`num-${tableNumber}`]}`}>{tableNumber}</span>
            <svg width="70" height="90">
              <rect width="30" height="30" style={{ fill: tableColor }} rx="7" x="20" y="25" />

              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="40" y="10" />
              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="15" y="10" />
              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="40" y="60" />
              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="15" y="60" />
            </svg>
          </span>
        </div>
      )}

      {numberOfseats === 2 && (
        <div className={styles["table-container"]} onMouseEnter={() => checkIsTableOpen()} onMouseLeave={() => setIsShowTableDetails(false)}>
          {isShowTableDetails && <SingleCompleteOrder tableNumber={tableNumber} />}

          <span className={styles["table-" + tableNumber]} onClick={() => handleTableClick(tableNumber)}>
            <span className={`${styles["table-num"]} ${styles[`num-${tableNumber}`]}`}>{tableNumber}</span>
            <svg width="50" height="90">
              <rect width="20" height="25" style={{ fill: tableColor }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="18" y="10" />
              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="18" y="55" />
            </svg>
          </span>
        </div>
      )}

      {numberOfseats === 6 && (
        <div className={styles["table-container"]} onMouseEnter={() => checkIsTableOpen()} onMouseLeave={() => setIsShowTableDetails(false)}>
          {isShowTableDetails && <SingleCompleteOrder tableNumber={tableNumber} />}
          <span className={styles["table-" + tableNumber]} onClick={() => handleTableClick(tableNumber)}>
            <span className={`${styles["table-num"]} ${styles[`num-${tableNumber}`]}`}>{tableNumber}</span>
            <svg width="90" height="90">
              <rect width="65" height="30" style={{ fill: tableColor }} rx="7" x="13" y="25" />

              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="10" y="10" />
              <rect width="17" height="10" style={{ fill: tableColor }} rx="3" x="37" y="10" />
              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="65" y="10" />

              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="10" y="60" />
              <rect width="17" height="10" style={{ fill: tableColor }} rx="3" x="37" y="60" />
              <rect width="15" height="10" style={{ fill: tableColor }} rx="3" x="65" y="60" />
            </svg>
          </span>
        </div>
      )}

      {numberOfseats === 7 && (
        <span
          className={styles["bar"]}
          onClick={() => handleTableClick("bar")}
          onMouseEnter={() => checkIsTableOpen()}
          onMouseLeave={() => setIsShowTableDetails(false)}
        >
          {isShowTableDetails && <SingleCompleteOrder tableNumber={tableNumber} />}

          <span className={`${styles["table-num"]} ${styles[`num-${tableNumber}`]}`}>{tableNumber}</span>

          <svg height="320" width="200">
            <g fill="none" stroke={tableColor} strokeWidth="20">
              <path strokeLinecap="round" d="M80 20 80 300" />
              <circle cx="50" cy="50" r="5" stroke={tableColor} strokeWidth="10" fill={tableColor} />
              <circle cx="50" cy="90" r="5" stroke={tableColor} strokeWidth="10" fill={tableColor} />
              <circle cx="50" cy="130" r="5" stroke={tableColor} strokeWidth="10" fill={tableColor} />
              <circle cx="50" cy="170" r="5" stroke={tableColor} strokeWidth="10" fill={tableColor} />
              <circle cx="50" cy="210" r="5" stroke={tableColor} strokeWidth="10" fill={tableColor} />
              <circle cx="50" cy="250" r="5" stroke={tableColor} strokeWidth="10" fill={tableColor} />
            </g>
          </svg>
        </span>
      )}
    </>
  );
}
