import { boardServices } from '../services';
import { BOARD_TYPES } from '../constants';
import { messageActions } from '../actions';
import { isEmpty } from 'lodash';

const createBoard = (data, history) => async (dispatch) => {
  try {

    dispatch({
      type: BOARD_TYPES.BOARD_SUBMIT,
      data
    });

    const response = await boardServices.create(data);

    if (!isEmpty(response)) {
      if (response.status < 200 || response.status >= 300) {
        dispatch({
          type: BOARD_TYPES.BOARD_FAILURE,
          error: response.message
        });
        dispatch(messageActions.error(response.message));
      } else {
        dispatch({
          type: BOARD_TYPES.BOARD_SUCCESS,
          data: response.data
        });
        dispatch(messageActions.success(response.data.message));
        history.push('/board-success');
      }
    }

  } catch (err) {
    return Promise.reject(err);
  }
};

const getBoardsPagination = (_start, _end) => async (dispatch) => {
  try {
    const { data, total } = await boardServices.getAllPagination(_start, _end);

    dispatch({
      type: BOARD_TYPES.BOARD_GET_ALL_PAGINATION,
      boards: data,
      totalBoards: total
    });

  } catch (err) {
    return Promise.reject(err);
  }
};

const getAllBoards = () => async (dispatch) => {
  try {
    const { data } = await boardServices.getAll();

    dispatch({
      type: BOARD_TYPES.BOARD_GET_ALL,
      data,
    });

  } catch (err) {
    return Promise.reject(err);
  }
}

const getBoardById = (id) => async (dispatch) => {
  try {
    const { data } = await boardServices.getById(id);

    dispatch({
      type: BOARD_TYPES.BOARD_GET_ID,
      record: data
    })

  } catch (err) {
    return Promise.reject(err);
  }
};

const getBoardPrevId = (id, history) => async (dispatch) => {
  try {
    const { data } = await boardServices.getById(id);

    dispatch({
      type: BOARD_TYPES.BOARD_GET_ID,
      record: data
    });

    return history.push(`/board-detail/${id}`)

  } catch (err) {
    return Promise.reject(err);
  }
}

const getBoardNextId = (id, history) => async (dispatch) => {
  try {
    const { data } = await boardServices.getById(id);

    dispatch({
      type: BOARD_TYPES.BOARD_GET_ID,
      record: data
    });

    return history.push(`/board-detail/${id}`)

  } catch (err) {
    return Promise.reject(err);
  }
}

const boardActions = {
  createBoard,
  getBoardsPagination,
  getBoardById,
  getAllBoards,
  getBoardPrevId,
  getBoardNextId
};

export default boardActions;