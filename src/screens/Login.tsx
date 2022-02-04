import styled from "styled-components";
import DarkModeToggle from "../components/DarkModeToggle";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin-top: 1rem;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  font-size: 3rem;
`;

const Login = () => {
  return (
    <Container>
      <Header>
        <DarkModeToggle />
      </Header>
      <LoginContainer>
        <div>Login</div>
      </LoginContainer>
    </Container>
  );
};

export default Login;
