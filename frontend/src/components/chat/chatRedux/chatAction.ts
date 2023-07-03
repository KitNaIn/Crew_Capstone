export const addMessage = (message: { text: string; sent: boolean; timestamp: string }) => {
    return {
        type: 'ADD_MESSAGE',
        payload: message,
    };
};
