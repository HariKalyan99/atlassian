import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateTicket from "./CreateTicket";
const ContactModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <IconButton onClick={handleClose} sx={closeButtonStyle}>
          <CloseIcon sx={{margin: "0.5rem", fontWeight: "400" }}/>
        </IconButton>
        <CreateTicket />
      </Box>
    </Modal>
  );
};

// Styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 'auto',
  bgcolor:"#224057a8",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  outline: "none",
};

const closeButtonStyle = {
  position: "absolute",
  top: 8,
  right: 8,
  color: "black",
};

export default ContactModal;
