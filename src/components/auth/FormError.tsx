import styled from "styled-components";

const SFormError = styled.span`
  color: tomato;
  font-weight: 500;
  font-size: 0.8rem;
  margin: 0.7rem 0px;
`;

interface IFormErrorProps {
  message: string | undefined;
}

const FormError: React.FC<IFormErrorProps> = ({ message }) => {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
};

export default FormError;
