import Header from "./Header";
import styled from "styled-components";

const Content = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  max-width: 80vw;
  width: 100%;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
