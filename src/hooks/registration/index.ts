import * as registrationActions from "~/store/registration/registrationAction";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRegistrationsParams, Registration } from "~/@types/registration";
import { RootState } from "~/store";
import { requestDeleteRegistration, requestGetRegistrations, requestPostRegistration, requestPutRegistration } from "~/services/registration";
import { useHideLoading, useShowLoading } from "../loading";
import { LoadingResource } from "~/constants";

const useRegistrationState = () => useSelector((rootState: RootState) => rootState.registrationState);

export const useRegistrations = () => {
  return useRegistrationState().registrations;
};

export const useGetRegistrations = () => {
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const dispatch = useDispatch();

  return useCallback(async (params?: GetRegistrationsParams) => {
    showLoading(LoadingResource.REGISTRATIONS);
    const result = await requestGetRegistrations(params);
    dispatch(registrationActions.getRegistrations(result));
    hideLoading(LoadingResource.REGISTRATIONS);
  }, [dispatch, showLoading, hideLoading]);
};

export const usePutRegistration = () => {
  const showLoading = useShowLoading();
  const getRegistrations = useGetRegistrations();

  return useCallback(async (registration: Registration) => {
    showLoading(LoadingResource.REGISTRATIONS);
    await requestPutRegistration(registration);
    getRegistrations();
  }, [getRegistrations, showLoading]);
};

export const useDeleteRegistration = () => {
  const showLoading = useShowLoading();
  const getRegistrations = useGetRegistrations();

  return useCallback(async (id: string) => {
    showLoading(LoadingResource.REGISTRATIONS);
    await requestDeleteRegistration(id);
    getRegistrations();
  }, [getRegistrations, showLoading]);
};

export const usePostRegistration = () => {
  const showLoading = useShowLoading();
  const getRegistrations = useGetRegistrations();

  return useCallback(async (registration: Omit<Registration, 'id'>) => {
    showLoading(LoadingResource.REGISTRATIONS);
    await requestPostRegistration(registration);
    getRegistrations();
  }, [getRegistrations, showLoading]);
};