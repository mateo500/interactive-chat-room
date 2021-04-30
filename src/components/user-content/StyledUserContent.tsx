import styled from "styled-components";

export const UserCircle = styled.div`
  background: #688ddd;
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;

export const UserMessageBox = styled.div`
  border-radius: 8px;
  border: 2px solid #5294f8;
  background: white;
  word-wrap: break-word;
  height: 120px;
  overflow-y: auto;
  padding: 10px;
  min-width: 200px;
`;

export const UserContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 230px;
`;

export const UsernameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const UserCircleContainer = styled.div`
  margin-right: 10px;
`;

export const NoMessagePlaceholder = styled.p`
  opacity: 0.4;
`;
