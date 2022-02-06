import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
`;

const AuthLayout: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AuthLayout;
