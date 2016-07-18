
import { combineReducers } from 'redux';
import { schema } from './schema';

import { ACTIONS } from '../actions/index';


function deviceFormat(state = schema.deviceFormat, action) {
  switch (action.type) {
    case ACTIONS.SET_DEVICE_FORMAT:
      return action.payload.deviceFormat;
    default:
      return state;

  }
}

export const store = combineReducers({
  deviceFormat,
});
