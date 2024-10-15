import { ModalData } from "~/@types/modal";

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const toggleModal = (modal: ModalData) => ({
  type: TOGGLE_MODAL,
  payload: {
    modal
  }
});

export interface ToggleModal {
  type: typeof TOGGLE_MODAL,
  payload: {
    modal: ModalData
  }
}

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export interface CloseModal {
  type: typeof CLOSE_MODAL
}