import { LoadingResource } from "~/constants";

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export const showLoading = (resource: LoadingResource) => ({
  type: SHOW_LOADING,
  payload: {
    resource
  }
});

export interface ShowLoading {
  type: typeof SHOW_LOADING;
  payload: {
    resource: LoadingResource
  }
}

export const hideLoading = (resource: LoadingResource) => ({
  type: HIDE_LOADING,
  payload: {
    resource
  }
});

export interface HideLoading {
  type: typeof HIDE_LOADING;
  payload: {
    resource: LoadingResource
  }
}
