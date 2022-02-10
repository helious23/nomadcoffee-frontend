import { Link } from "react-router-dom";
import routes from "../../routes";
import DarkModeToggle from "../DarkModeToggle";
import { HeaderText, Icon, IconsContainer } from "../shared";

const LoggedOutHeader = () => {
  return (
    <IconsContainer>
      <Icon>
        <Link to={routes.login}>
          <HeaderText>추천 리스트</HeaderText>
        </Link>
      </Icon>
      <Icon>
        <Link to={routes.login}>
          <HeaderText>로그인</HeaderText>
        </Link>
      </Icon>
      <Icon>
        <DarkModeToggle />
      </Icon>
    </IconsContainer>
  );
};

export default LoggedOutHeader;
