import { createStore, createTypedHooks } from 'easy-peasy';
import model, { StoreModel } from './model';

const store = createStore<StoreModel>(model);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
export const useStoreDispatch = typedHooks.useStoreDispatch;

export default store;