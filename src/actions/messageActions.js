import { MESSAGE_TYPES } from '../constants';

const messageActions = {
  success,
  error,
  clear
};

function success(message) {
  return { type: MESSAGE_TYPES.SUCCESS, message };
}

function error(message) {
  return { type: MESSAGE_TYPES.ERROR, message };
}

function clear() {
  return { type: MESSAGE_TYPES.CLEAR };
};

export default messageActions;