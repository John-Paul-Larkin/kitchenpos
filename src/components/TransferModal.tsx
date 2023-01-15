import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { menuContext } from "./MenuContext";
import useChangeTableNumber from "../Helper/useChangeTableNumber";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "14px",
};

export default function TransferModal({
  isModalOpen,
  setIsModalOpen,
  handleSendOrder,
  tableNumToChangeTo,
}: {
  tableNumToChangeTo: string | null;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendOrder: () => void;
}) {
  const handleCloseModal = () => setIsModalOpen(false);

  const { orderDetails, setSelectedOrderItem } = useContext(menuContext);
  const { dispatch } = useContext(menuContext);
  const changeTableNumber = useChangeTableNumber();

  const handleTransferItems = () => {
    const itemsToTranfer = orderDetails.orderItemDetails.filter((item) => item.isSentToKitchen !== true);
    dispatch({ type: "clear order" });
    setSelectedOrderItem(null);
    changeTableNumber(tableNumToChangeTo!);
    dispatch({ type: "add transfered items", payload: itemsToTranfer });

    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}

          <div>There are items added to this order which have not been sent to the kitchen. </div>
          <br />
          <div>Transfer items to table {tableNumToChangeTo}?</div>
          <div>Or send them to the kitchen on table {orderDetails.tableNumber}?</div>

          {/* </Typography> */}
          <br />
          <button onClick={() => handleCloseModal()}>Cancel</button>
          <button onClick={() => handleTransferItems()}>Transfer</button>
          <button onClick={() => handleSendOrder()}>Send</button>
        </Box>
      </Modal>
    </div>
  );
}
