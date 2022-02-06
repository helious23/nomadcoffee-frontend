import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  background-color: ${(props) => props.theme.bgColor};
  transition: all 0.5s ease-in-out;
  form {
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
    max-width: 20vw;
  }
`;

const FormBox: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FormBox;
