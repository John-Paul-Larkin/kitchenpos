import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";


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

export default function CancelItemModal({
  isModalOpen,
  setIsModalOpen,

}: {

  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

}) {
  const handleCloseModal = () => setIsModalOpen(false);



  return (
    <div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <div>This item has already been sent to the kitchen</div>
          <div>Would you still like to cancel it?</div>

          {/* </Typography> */}
          <br />
          <button onClick={() => handleCloseModal()}>Cancel</button>
          <button onClick={() => {}}>Send</button>
        </Box>
      </Modal>
    </div>
  );
}
