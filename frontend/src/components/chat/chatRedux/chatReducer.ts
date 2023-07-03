import { createStore } from 'redux';

interface ChatState {
    messages: { text: string; sent: boolean; timestamp: string }[];
}

const initialState: ChatState = {
    messages: [],
};

const chatReducer = (state = initialState, action: { type: string; payload: any }): ChatState => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
};

const store = createStore(chatReducer);

export default store;
