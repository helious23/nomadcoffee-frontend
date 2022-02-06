import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../../routes";

const SAuthHeader = styled.div`
  position: fixed;
  width: 50vw;
  padding: 0.5rem;
`;

const AuthLogo = styled.div`
  display: flex;
  color: ${(props) => props.theme.accent};
  margin: 0.5rem;
  flex-direction: column;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: "Righteous", cursive;
`;

const AuthHeader = () => {
  return (
    <SAuthHeader>
      <Link to={routes.home}>
        <AuthLogo>
          <span>Nomad</span>
          <span>Coffee</span>
        </AuthLogo>
      </Link>
    </SAuthHeader>
  );
};

export default AuthHeader;
