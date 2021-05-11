import { REDIRECT_TYPES } from '../constants';

const redirectPageCreate = (history) => (dispatch) => {

  dispatch({
    type: REDIRECT_TYPES.REDIRECT_PAGE_CREATE
  });

  return history.push('/board-create');
};

const redirectConfirmPage = (data, history) => (dispatch) => {

  dispatch({
    type: REDIRECT_TYPES.REDIRECT_PAGE_CONFIRM,
    data
  });

  return history.push('/board-confirm');
};

const redirectBackCreate = (data, history) => (dispatch) => {

  dispatch({
    type: REDIRECT_TYPES.REDIRECT_BACK_CREATE,
    data
  });

  return history.push('/board-create');
};

const redirectBackList = (history) => (dispatch) => {

  dispatch({
    type: REDIRECT_TYPES.REDIRECT_BACK_LIST
  });

  return history.push('/board-list')
}

const redirectActions = {
  redirectPageCreate,
  redirectConfirmPage,
  redirectBackCreate,
  redirectBackList
};

export default redirectActions;