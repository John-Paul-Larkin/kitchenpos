import { useContext } from "react";
import { menuContext } from "../Context/MenuContext";
import useChangeTableNumber from "../Hooks/useChangeTableNumber";
import styles from "../styles/FloorPlan.module.css";
import OpenOrders from "./OpenOrders";
import TableDrawing from "./TableDrawing";

export default function Floorplan() {
  const changeTableNumber = useChangeTableNumber();

  const { setisShowFloorPlan, dispatch, setSelectedOrderItem } = useContext(menuContext);

  const handleTableClick = (table: string) => {
    setisShowFloorPlan(false);
    dispatch({ type: "clear order" });
    setSelectedOrderItem(null);

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

        <TableDrawing tableNumber={"8"} numberOfseats={6} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"9"} numberOfseats={4} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"10"} numberOfseats={2} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"11"} numberOfseats={6} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"bar"} numberOfseats={7} handleTableClick={handleTableClick} />
        <TableDrawing tableNumber={"12"} numberOfseats={2} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"13"} numberOfseats={2} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"14"} numberOfseats={2} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"15"} numberOfseats={4} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"16"} numberOfseats={4} handleTableClick={handleTableClick} />

        <TableDrawing tableNumber={"17"} numberOfseats={4} handleTableClick={handleTableClick} />
        {/* 
        <TableDrawing tableNumber={"18"} numberOfseats={4} handleTableClick={handleTableClick} /> */}
      </div>

      <OpenOrders />
    </>
  );
}
