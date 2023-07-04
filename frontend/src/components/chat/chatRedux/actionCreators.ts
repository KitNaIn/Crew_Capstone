import * as actionTypes from './actionTypes';

export function addMessage(message: MessageDto): AddMessageAction {
    return {
        type: actionTypes.ADD_MESSAGE,
        message,
    };
}