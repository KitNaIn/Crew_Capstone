
import * as actionTypes from './actionTypes';

const initialState: ChatState = {
    messages: [
        {
            text: "this is a test",
            sent: true,
            timestamp: "03.07.2023 - 21:20"
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