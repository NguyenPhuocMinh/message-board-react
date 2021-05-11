import { combineReducers } from 'redux';

import boardReducer from './boardReducer';
import redirectReducer from './redirectReducer';
import dataBoardReducer from './dataBoardReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  boardReducer,
  redirectReducer,
  dataBoardReducer,
  messageReducer
});

export default rootReducer;