import { useContext } from "react";
import useChangeTableNumber from "../Helper/useChangeTableNumber";
import styles from "../styles/FloorPlan.module.css";
import  { menuContext } from "./MenuContext";
import OpenOrders from "./OpenOrders";
import TableDrawing from "./TableDrawing";

export default function Floorplan() {

  const changeTableNumber = useChangeTableNumber();

const {setisShowFloorPlan } = useContext(menuContext);


  const handleTableClick = (table: string) => {
    setisShowFloorPlan((cur) => !cur);
    changeTableNumber(table);
  };

  return (
    <>
      <div className={styles["floor-plan"]}>
        <TableDrawing tableNumber={"1"} numberOfseats={4} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"2"} numberOfseats={6} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"3"} numberOfseats={2} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"4"} numberOfseats={4} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"5"} numberOfseats={6} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"6"} numberOfseats={2} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"7"} numberOfseats={4} handleTableClick={handleTableClick} />

        {/* bar and stools */}

        <span className={styles["bar"]} onClick={() => handleTableClick("bar")}>
          <svg height="320" width="200">
            <g fill="none" stroke="black" strokeWidth="20">
              <path strokeLinecap="round" d="M80 20 80 300" />
              <circle cx="50" cy="50" r="5" stroke="black" strokeWidth="10" fill="black" />
              <circle cx="50" cy="90" r="5" stroke="black" strokeWidth="10" fill="black" />
              <circle cx="50" cy="130" r="5" stroke="black" strokeWidth="10" fill="black" />
              <circle cx="50" cy="170" r="5" stroke="black" strokeWidth="10" fill="black" />
              <circle cx="50" cy="210" r="5" stroke="black" strokeWidth="10" fill="black" />
              <circle cx="50" cy="250" r="5" stroke="black" strokeWidth="10" fill="black" />
            </g>
          </svg>
        </span>

        <TableDrawing tableNumber={"8"} numberOfseats={6} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"9"} numberOfseats={4} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"10"} numberOfseats={2} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"11"} numberOfseats={6} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"12"} numberOfseats={4} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"13"} numberOfseats={4} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"14"} numberOfseats={4} handleTableClick={handleTableClick} />
      </div>

      <OpenOrders />
    </>
  );
}
