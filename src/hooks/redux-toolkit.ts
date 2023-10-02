import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState, RootDispatch } from '../redux/store';

/**
 * A typed selector hook that can be used to select a slice of the Redux store state.
 * @returns The selected slice of the store state.
 */
export const useRTKSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * A typed dispatch hook that can be used to dispatch actions to the Redux store.
 * @returns The dispatch function.
 */
export const useRTKDispatch: () => RootDispatch = useDispatch;
