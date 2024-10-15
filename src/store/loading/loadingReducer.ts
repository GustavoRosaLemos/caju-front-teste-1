import { LoadingResource } from '~/constants';
import * as loadingActions from '../loading/loadingActions';

export interface State {
  loading: LoadingResource[];
}

const INITIAL_STATE: State = {
  loading: []
};

export type Actions = loadingActions.HideLoading | loadingActions.ShowLoading;

const loadingReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case loadingActions.SHOW_LOADING: {
      const {resource} = action.payload;
      return {
        ...state,
        loading: state.loading.concat(resource)
      };
    }
    case loadingActions.HIDE_LOADING: {
      const {resource} = action.payload;
      return {
        ...state,
        loading: state.loading.filter(v => v != resource),
      };
    }
    default: {
      return state;
    }
  }
};

export default loadingReducer;
