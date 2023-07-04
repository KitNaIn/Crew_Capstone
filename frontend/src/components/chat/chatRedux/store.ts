
import {configureStore, Store} from '@reduxjs/toolkit';
import { chatReducer } from "./chatReducer";

export const store: Store<ChatState, AddMessageAction> & {
    dispatch: DispatchType
} = configureStore({
    reducer: chatReducer
});