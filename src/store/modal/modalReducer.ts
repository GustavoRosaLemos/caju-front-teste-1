import * as modalActions from "./modalAction";
import { ModalData } from "~/@types/modal";

export interface State {
  modal?: ModalData
}

const INITIAL_STATE: State = {
  modal: undefined
};

export type Actions = modalActions.ToggleModal | modalActions.CloseModal

const modalReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case modalActions.TOGGLE_MODAL: {
      const {modal} = action.payload;
      return {
        ...state,
        modal
      };
    }
    case modalActions.CLOSE_MODAL: {
      return {
        ...state,
        modal: undefined
      };
    }
    default:
      return state;
  }
};

export default modalReducer;