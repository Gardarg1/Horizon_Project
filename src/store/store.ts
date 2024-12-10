import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Middleware } from 'redux';
import { reducer } from './reducer';

const customMiddleware: Middleware<{ state: RootState }, RootState> =
  (store) => (next) => (action) => {
    next(action);
    return { state: store.getState() };
  };

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(customMiddleware),
});

type RootState = ReturnType<typeof reducer>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector, useAppDispatch };
export type { RootState, AppDispatch };
export default store;
