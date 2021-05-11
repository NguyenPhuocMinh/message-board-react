import { BOARD_TYPES } from '../constants';

const initialState = {
  data: {
    registerDate: null,
    title: '',
    name: '',
    text: ''
  }
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOARD_TYPES.BOARD_SUCCESS:
      return {
        data: action.data
      }
    case BOARD_TYPES.BOARD_FAILURE:
      return {
        data: action.data
      };
    case BOARD_TYPES.BOARD_GET_ALL_PAGINATION:
      return {
        boards: action.boards,
        totalBoards: action.totalBoards
      };
    case BOARD_TYPES.BOARD_GET_ID:
      return {
        record: action.record
      }
    default:
      return state
  }
};

export default boardReducer;