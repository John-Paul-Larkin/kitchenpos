import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext, useEffect } from "react";
import { menuContext } from "./MenuContext";
import useSendOrder from "../Helper/useSendOrder";

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

export default function BasicModal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleCloseModal = () => setIsModalOpen(false);

  const { orderDetails } = useContext(menuContext);


  const handleTransferItems = () => {
    const itemsToTranfer = orderDetails.orderItemDetails.filter((item) => item.isSentToKitchen !== true);
    console.log(itemsToTranfer);
  };

  const handleSendOrder = () => {}


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
          <div>Transfer them to the new table?</div>
          <div>Or send them to the kitchen on this table?</div>

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
