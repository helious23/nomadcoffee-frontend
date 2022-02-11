import styled from "styled-components";

interface IAuthInputProps {
  hasError: boolean;
  change?: boolean;
}

const AuthInput = styled.input.attrs({ require: true })<IAuthInputProps>`
  width: 100%;
  border-radius: 3px;
  padding: ${(props) => (props.change ? "1rem 0 0.2rem 0.5rem" : "0.5rem")};
  background-color: ${(props) => props.theme.formBgColor};
  color: ${(props) => props.theme.fontColor};
  font-size: ${(props) => (props.change ? "0.8rem" : "1rem")};
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default AuthInput;
