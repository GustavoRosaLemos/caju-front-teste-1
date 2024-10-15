import { If } from "react-if";
import { Card, Container, Title } from "./styles";
import Button from "../Buttons";
import { useCloseModal, useModal } from "~/hooks/modal";
import { Group } from "../Layout";
import { useState } from "react";


const ConfirmationModal = () => {
  const [isClosing, setIsClosing] = useState(false);
  const closeModal = useCloseModal();
  const modal = useModal();
  const handleConfirm = () => {
    if (modal?.onConfirm) {
      modal?.onConfirm();
    }
    setIsClosing(true);
    handleClosing();
  };

  const handleClose = () => {
    if (modal?.onCancel) {
      modal?.onCancel();
    }
    setIsClosing(true);
    handleClosing();
  };

  const handleClosing = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      closeModal();
    }, 300);
  };

  return (
    <If condition={!!modal}>
      <Container>
        <Card isClosing={isClosing}>
          <Title>
            {modal?.title}
          </Title>
          <Group justify="space-around">
            <Button variant="outlined" color="rgb(255, 145, 154)" onClick={handleClose}>{modal?.cancelLabel ?? 'Cancelar'}</Button>
            <Button variant="outlined" color="rgb(155, 229, 155)" onClick={handleConfirm}>{modal?.confirmLabel ?? 'Confirmar'}</Button>
          </Group>
        </Card>
      </Container>
    </If>
  );};

export default ConfirmationModal;