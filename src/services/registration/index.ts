import { GetRegistrationsParams, Registration } from "~/@types/registration";
import { requestService } from "~/utils/request";

export const requestGetRegistrations = (params?: GetRegistrationsParams) => 
  requestService("/registrations", {}, {}, params);

export const requestPutRegistration = (registration: Registration) => 
  requestService(`/registrations/${registration.id}`, registration, {}, {}, false, "PUT");

export const requestPostRegistration = (registration: Omit<Registration, 'id'>) =>
  requestService("/registrations", registration, {}, {}, false, "POST");

export const requestDeleteRegistration = (id: string) =>
  requestService(`/registrations/${id}`, {}, {}, {}, false, "DELETE");