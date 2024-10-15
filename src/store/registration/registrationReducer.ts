import { Actions } from "~/pages/Dashboard/components/RegistrationCard/styles";
import * as registrationActions from "./registrationAction";

import { RegistrationsData } from "~/@types/registration";

export interface State {
  registrations?: RegistrationsData
}

const INITIAL_STATE: State = {
  registrations: undefined
};

export type Actions = registrationActions.GetRegistrations

const registrationReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case registrationActions.GET_REGISTRATIONS: {
      const {registrations} = action.payload;
      return {
        ...state,
        registrations
      };
    }
    default:
      return state;
  }
};

export default registrationReducer;