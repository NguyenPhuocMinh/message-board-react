import { MESSAGE_TYPES } from '../constants';

const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.SUCCESS:
      return {
        type: 'success',
        message: action.message
      };
    case MESSAGE_TYPES.ERROR:
      return {
        type: 'danger',
        message: action.message
      };
    case MESSAGE_TYPES.CLEAR:
      return {};
    default:
      return state
  }
};

export default messageReducer;