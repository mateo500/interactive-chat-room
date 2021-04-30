import styled from "styled-components";

export const FieldSet = styled.fieldset`
  border: none;
`;

export const Label = styled.label`
  margin-right: 10px;
`;

export const Input = styled.input`
  :focus {
    outline: none;
  }

  border: 1px solid gray;
`;

export const Form = styled.form`
  padding: 20px;
  max-width: 100%;
  display: inline-block;
  border-radius: 8px;
`;

export const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  background: #59d459;
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
