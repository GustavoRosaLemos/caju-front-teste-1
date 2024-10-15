import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalData } from "~/@types/modal";
import { RootState } from "~/store";
import * as modalActions from '~/store/modal/modalAction';

const useModalState = () => useSelector((rootState: RootState) => rootState.modalState);

export const useModal = () => useModalState().modal;

export const useToggleModal = () => {
  const dispatch = useDispatch();

  return useCallback((modal: ModalData) => {
    dispatch(modalActions.toggleModal(modal));
  }, [dispatch]);
};

export const useCloseModal = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(modalActions.closeModal());
  }, [dispatch]);
};