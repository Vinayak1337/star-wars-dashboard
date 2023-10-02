import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../app/app.slice';

const rootReducer = combineReducers({
	appReducer
});

export default rootReducer;
