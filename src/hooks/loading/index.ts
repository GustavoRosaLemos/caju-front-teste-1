import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/reducers';
import {hideLoading, showLoading} from '~/store/loading/loadingActions';
import { LoadingResource } from '~/constants';

const useLoadingState = () => useSelector((rootState: RootState) => rootState.loadingState);

export const useIsLoading = (): boolean => useLoadingState().loading.length > 0;

export const useShowLoading = () => {
  const dispatch = useDispatch();

  return useCallback((loadingResource: LoadingResource) => {
    dispatch(showLoading(loadingResource));
  }, [dispatch]);
};

export const useHideLoading = () => {
  const dispatch = useDispatch();

  return useCallback((loadingResource: LoadingResource) => {
    dispatch(hideLoading(loadingResource));
  }, [dispatch]);
};