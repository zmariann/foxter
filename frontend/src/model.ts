import { Action, action, Thunk, thunk, createStore } from "easy-peasy";
import { FoxProps } from "../../shared/types";

export interface StoreModel {
    foxes: FoxProps[];
    search: string;
    setFoxes: Action<StoreModel, FoxProps[]>;
    deleteFox: Action<StoreModel, number>;
    setSearch: Action<StoreModel, string>;
}

const model: FoxModel = {
    foxes: [],
    search: '',
    setFoxes: action((state, payload) => {
        state.foxes = payload;
    }),
    deleteFox: action((state, payload) => {
        state.foxes = state.foxes.filter((fox) => fox.id !== payload);
    }),
    setSearch: action((state, payload) => {
        state.search = payload;
    }),

};

export default model;