interface MessageDto {
    message: string;
    messageId: string;
    timeStamp: string;
    userName: string;
}

type ChatState = {
    messages: MessageDto[];
}

type AddMessageAction = {
    type: string,
    message: MessageDto
}

type DispatchType = (args: AddMessageAction) => AddMessageAction