import { FC, ReactElement } from "react";
import {
  UserCircle,
  UserContentContainer,
  UserMessageBox,
  UsernameContainer,
  UserCircleContainer,
} from "./StyledUserContent";

interface UserContentProps {
  messageElementId: string;
  message: string;
  username: string;
}

const UserContent: FC<UserContentProps> = ({
  messageElementId,
  message,
  username,
}): ReactElement<HTMLDivElement> => (
  <UserContentContainer>
    <UserCircleContainer>
      <UserCircle />
      <UsernameContainer>{username}</UsernameContainer>
    </UserCircleContainer>
    <UserMessageBox id={messageElementId}>{message}</UserMessageBox>
  </UserContentContainer>
);

export default UserContent;
