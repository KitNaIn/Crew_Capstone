export const ADD_MESSAGE = "ADD_MESSAGE";
export function addMessage(message: Message): AddMessageAction {
    return {
        type: ADD_MESSAGE,
        message,
    };
}