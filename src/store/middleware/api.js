import axios from 'axios';
import * as actions from '../api';
import IP from '../../utils/constatns';

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError, headers } =
      action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: `http://${IP}:9002`,
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess)
        dispatch({
          type: onSuccess,
          payload: response.data,
          headers: response.headers,
        });
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
