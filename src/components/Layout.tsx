import Header from "./Header";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { profileVar, onMenuClose } from "../apollo";

const Container = styled.div`
  min-height: 100%;
  padding-bottom: 3rem;
`;

interface ILayoutProps {
  screen: "shopDetail" | "comment" | "other";
}

const Content = styled.div<ILayoutProps>`
  margin: 0 auto;
  max-width: ${(props) =>
    props.screen === "shopDetail"
      ? "100vw"
      : props.screen === "comment"
      ? "40vw"
      : "70vw"};
  height: 100%;
  padding: 3rem 0; ;
`;

const Layout: React.FC<ILayoutProps> = ({ children, screen }) => {
  const profileVisible = useReactiveVar(profileVar);
  return (
    <Container onClick={() => onMenuClose(profileVisible)}>
      <Header />
      <Content screen={screen}>{children}</Content>
    </Container>
  );
};

export default Layout;
