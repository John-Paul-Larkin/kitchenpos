import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { menuContext } from "../Context/MenuContext";

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

export default function CancelItemModal() {
  const { isShowCancelModal, setIsShowCancelModal } = useContext(menuContext);

  const handleCloseModal = () => setIsShowCancelModal(false);

  return (
    <div>
      <Modal open={isShowCancelModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <div>This item has already been sent to the kitchen</div>
          <div>Would you still like to cancel it?</div>

          <br />
          <button onClick={() => handleCloseModal()}>Cancel</button>
          <button onClick={() => {}}>Send</button>
        </Box>
      </Modal>
    </div>
  );
}
