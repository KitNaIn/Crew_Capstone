import * as actionTypes from './actionTypes';

export function addMessage(message: Message): AddMessageAction {
    return {
        type: actionTypes.ADD_MESSAGE,
        message,
    };
}