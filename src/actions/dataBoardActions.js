import { BOARD_TYPES } from '../constants';
import { boardServices } from '../services';

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
};

const dataBoardActions = {
  getAllBoards
};

export default dataBoardActions;