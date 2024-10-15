import { RegistrationsData } from "~/@types/registration";

export const GET_REGISTRATIONS = 'GET_REGISTRATIONS';

export const getRegistrations = (registrations: RegistrationsData) => ({
  type: GET_REGISTRATIONS,
  payload: {
    registrations
  }
});

export interface GetRegistrations {
  type: typeof GET_REGISTRATIONS,
  payload: {
    registrations: RegistrationsData
  }
}