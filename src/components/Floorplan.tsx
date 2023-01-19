import { useContext } from "react";
import { useAppDispatch } from "../app/hooks";
import { menuContext } from "../Context/MenuContext";
import { clearOrder } from "../features/orderDetailsSlice";
import { setSelectedItemToEmpty } from "../features/selectedOrderItemSlice";
import useChangeTableNumber from "../Hooks/useChangeTableNumber";
import styles from "../styles/FloorPlan.module.css";
import OpenOrdersList from "./OpenOrdersList";
import TableDrawing from "./TableDrawing";

export default function Floorplan() {
  const dispatch = useAppDispatch();

  const changeTableNumber = useChangeTableNumber();

  const { setisShowFloorPlan } = useContext(menuContext);

  const handleTableClick = (table: string) => {
    setisShowFloorPlan(false);
    // dispatch({ type: "clear order" });

    dispatch(clearOrder());

    // setSelectedOrderItem(null);

    dispatch(setSelectedItemToEmpty());

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

      <OpenOrdersList />
    </>
  );
}
