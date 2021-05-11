import { REDIRECT_TYPES } from '../constants';

const initialState = {
  data: {
    registerDate: null,
    title: '',
    name: '',
    text: ''
  }
};

const redirectReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT_TYPES.REDIRECT_PAGE_CREATE:
      return initialState;
    case REDIRECT_TYPES.REDIRECT_PAGE_CONFIRM:
      return {
        data: action.data
      };
    case REDIRECT_TYPES.REDIRECT_BACK_CREATE:
      return {
        data: action.data
      }
    case REDIRECT_TYPES.REDIRECT_BACK_LIST:
      return state;
    default:
      return state
  }
};

export default redirectReducer;