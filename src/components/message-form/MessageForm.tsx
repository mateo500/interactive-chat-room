import { FC, ReactElement } from "react";
import { FieldSet, Input, Button } from "../login-form/StyledLoginForm";
import {
  FormContainer,
  FormMessage,
  MessageFieldsContainer,
} from "./StyledMessageForm";

interface MessageFormProps {
  sendMessageHandler: (message: string) => void;
}

const MessageForm: FC<MessageFormProps> = ({
  sendMessageHandler,
}): ReactElement<HTMLDivElement> => (
  <FormContainer>
    <FormMessage
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const { message } = Object.fromEntries(formData.entries());

        sendMessageHandler(message.toString());
      }}
    >
      <MessageFieldsContainer>
        <FieldSet style={{ width: "100%" }}>
          <Input
            style={{ width: "100%" }}
            type="text"
            name="message"
            id="message"
            required
          />
        </FieldSet>

        <Button type="submit">Send</Button>
      </MessageFieldsContainer>
    </FormMessage>
  </FormContainer>
);

export default MessageForm;
