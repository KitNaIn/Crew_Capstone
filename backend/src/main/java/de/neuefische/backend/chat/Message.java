package de.neuefische.backend.chat;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("Messages")
@Builder
@With
public class Message {
    private String messageId;
    private String userName;
    private String message;
    private String timeStamp;
}
