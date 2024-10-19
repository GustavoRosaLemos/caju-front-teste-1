import { If, Then } from "react-if";
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
      <Then>
        <Container>
          <Card isClosing={isClosing} data-testid="ConfirmationModal_Card">
            <Title>
              {modal?.title}
            </Title>
            <Group justify="space-around">
              <Button data-testid="ConfirmationModal_Button_cancel" variant="outlined" color="rgb(255, 145, 154)" onClick={handleClose}>{modal?.cancelLabel ?? 'Cancelar'}</Button>
              <Button data-testid="ConfirmationModal_Button_confirm" variant="outlined" color="rgb(155, 229, 155)" onClick={handleConfirm}>{modal?.confirmLabel ?? 'Confirmar'}</Button>
            </Group>
          </Card>
        </Container>
      </Then>
    </If>
  );};

export default ConfirmationModal;