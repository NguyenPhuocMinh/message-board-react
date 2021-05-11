import { BOARD_TYPES } from '../constants';

const dataBoardReducer = (state = {}, action) => {
  switch (action.type) {
    case BOARD_TYPES.BOARD_GET_ALL:
      return {
        data: action.data
      }
    default:
      return state
  }
};

export default dataBoardReducer;