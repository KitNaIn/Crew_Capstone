
interface Message {
    text: string;
    sent: boolean;
    timestamp: string;
}

type ChatState = {
    messages: Message[];
}

type AddMessageAction = {
    type: string,
    message: Message
}

type DispatchType = (args: AddMessageAction) => AddMessageAction