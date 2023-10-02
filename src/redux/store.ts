import Saga from 'redux-saga';
import rootReducer from './root/root.reducer';
import rootSaga from './root/root.saga';
import { configureStore, Middleware } from '@reduxjs/toolkit';

const sagaMiddleware = Saga();

const middlewares: Middleware[] = [sagaMiddleware];

const Store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof Store.getState>;
export type RootDispatch = typeof Store.dispatch;

export default Store;
