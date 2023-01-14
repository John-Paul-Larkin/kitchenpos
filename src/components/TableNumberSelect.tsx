import { useContext, useState } from "react";
import useChangeTableNumber from "../Helper/useChangeTableNumber";
import styles from "../styles/OrderScreen.module.css";
import TransferModal from "./TransferModal";
import { menuContext } from "./MenuContext";

export default function TableNumberSelect({ handleSendOrder }: { handleSendOrder: () => void }) {
  const { selectedTableNumber } = useContext(menuContext);
  const { dispatch } = useContext(menuContext);
  const { orderDetails } = useContext(menuContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const changeTableNumber = useChangeTableNumber();

  const [tableNumToChangeTo, setTableNumToChangeTo] = useState<null | string>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (orderDetails.orderItemDetails && orderDetails.orderItemDetails.filter((item) => item.isSentToKitchen !== true).length > 0) {
      // if there is at least one new item added
      // modal to ask user if they want to cancel those items, send the order, or transfer to  the new table.
      setTableNumToChangeTo(e.target.value);
      handleOpenModal();
    } else {
      // just change the table number
      dispatch({ type: "change table number", payload: e.target.value });
      dispatch({ type: "clear order" });
      changeTableNumber(e.target.value);
    }
  };

  return (
    <div className={styles["table-select-wrapper"]}>
      <form>
        <TransferModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleSendOrder={handleSendOrder}
          tableNumToChangeTo={tableNumToChangeTo}
        />
        <label htmlFor="table-number">
          <div className={styles["table-number"]}>Table:{selectedTableNumber}</div>
        </label>
        <select value={selectedTableNumber} className={styles["table-select"]} onChange={(e) => handleSelectChange(e)}>
          <option value="Bar">Bar</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          {/* <option value="18">18</option> */}
        </select>
      </form>
    </div>
  );
}
