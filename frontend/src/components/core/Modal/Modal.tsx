import React from "react";
import useModal from "../../../hooks/useModal";
import { Backdrop, CloseIcon, Container, ModalBox } from "./styles";

const Modal: React.FC = () => {
  const [open, view, closeModal] = useModal();

  // return <h1>test</h1>;

  return (
    <Container open={open}>
      <Backdrop onClick={closeModal} />
      <ModalBox>
        <CloseIcon onClick={closeModal} />
        {view}
      </ModalBox>
    </Container>
  );
};

export default Modal;
