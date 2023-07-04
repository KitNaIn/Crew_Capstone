
import * as actionTypes from './actionTypes';

const initialState: ChatState = {
    messages: [
        {
            message: "Geh gefälligst Arbeiten du faule Socke!",
            userName: "admin@Crew.de",
            timeStamp: "03.07.2023 - 21:20",
            messageId: "6da01f56-b60f-4120-b0cf-e1511a5ec954"
        },
    ],
};

export const chatReducer = (state: ChatState = initialState, action: AddMessageAction): ChatState => {
    switch (action.type) {
        case actionTypes.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
    }
    return state;
}