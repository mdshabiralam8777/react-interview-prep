import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { CounterActionTypes } from './actions';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
