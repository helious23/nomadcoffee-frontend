import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../../routes";

const SAuthHeader = styled.div`
  position: fixed;
  width: 50vw;
  padding: 0.5rem;
`;

const AuthLogo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 6rem;
  color: ${(props) => props.theme.accent};
  margin: 0.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: "Righteous", cursive;
`;

const AuthHeader = () => {
  return (
    <SAuthHeader>
      <AuthLogo to={routes.home}>
        <div>Nomad</div>
        <div>Coffee</div>
      </AuthLogo>
    </SAuthHeader>
  );
};

export default AuthHeader;
