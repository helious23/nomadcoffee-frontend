import { useReactiveVar } from "@apollo/client";
import { AnimationControls, motion } from "framer-motion";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { profileVar, logUserOut } from "../../apollo";
import { useMe } from "../../hooks/useMe";
import routes from "../../routes";
import Avatar from "../Avatar";
import DarkModeToggle from "../DarkModeToggle";
import { HeaderText, Icon, IconsContainer } from "../shared";

const AvatarContainer = styled(motion.div)``;

const AvatarImg = styled.div`
  cursor: pointer;
`;

interface IAvatarMenuProps {
  $mouseover: boolean;
}

const AvatarMenu = styled(motion.div)<IAvatarMenuProps>`
  transform-origin: top;
  width: 15rem;
  height: 16rem;
  background-color: ${(props) => props.theme.menuBgColor};
  border-radius: 10px;
  position: absolute;
  margin-top: 1rem;
  margin-left: -12rem;
  box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  &:before {
    content: "";
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid
      ${(props) =>
        props.$mouseover ? props.theme.accent : props.theme.menuBgColor};
    border-top: 12px solid none;
    position: absolute;
    top: -12px;
    right: 1.2rem;
  }
`;

const MenuLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

interface IMenuTextProps {
  position?: "top" | "bottom";
}

const MenuText = styled.div<IMenuTextProps>`
  color: ${(props) => props.theme.fontColor};
  border-top-left-radius: ${(props) =>
    props.position === "top" ? "10px" : "0px"};
  border-top-right-radius: ${(props) =>
    props.position === "top" ? "10px" : "0px"};
  border-bottom-left-radius: ${(props) =>
    props.position === "bottom" ? "10px" : "0px"};
  border-bottom-right-radius: ${(props) =>
    props.position === "bottom" ? "10px" : "0px"};
  height: 100%;
  width: 100%;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: ${(props) => props.theme.accent};
    color: white;
    cursor: pointer;
  }
`;

interface ILoggedInHeaderProps {
  menuAnimation: AnimationControls;
}

const LoggedInHeader: React.FC<ILoggedInHeaderProps> = ({ menuAnimation }) => {
  const [fillMenu, setFillMenu] = useState(false);
  const { data: userData } = useMe();
  const profileVisible = useReactiveVar(profileVar);
  const history = useHistory();

  const onMenuClick = () => {
    profileVar(true);
    if (profileVisible) {
      menuAnimation.start({
        scaleY: 0,
      });
    } else if (!profileVisible) {
      menuAnimation.start({
        scaleY: 1,
      });
    }
  };

  return (
    <IconsContainer>
      <Icon>
        <Link to={`/category/케익`}>
          <HeaderText>카테고리</HeaderText>
        </Link>
      </Icon>
      <Icon>
        <Link to={`/likes/${userData?.me?.id}`}>
          <HeaderText>위시 리스트</HeaderText>
        </Link>
      </Icon>
      <Icon>
        <AvatarContainer>
          <AvatarImg onClick={onMenuClick}>
            <Avatar url={userData?.me?.avatarURL} size={2} />
          </AvatarImg>

          <AvatarMenu
            animate={menuAnimation}
            initial={{ scaleY: 0 }}
            transition={{ duration: 0.3, type: "linear" }}
            $mouseover={fillMenu}
          >
            <MenuLink to={`/profile/${userData?.me?.id}`}>
              <MenuText
                onMouseEnter={() => setFillMenu(true)}
                onMouseLeave={() => setFillMenu(false)}
                position="top"
              >
                프로필 보기
              </MenuText>
            </MenuLink>
            <MenuLink to={routes.createCafe}>
              <MenuText>카페 등록하기</MenuText>
            </MenuLink>
            <MenuLink to={routes.search}>
              <MenuText>검색</MenuText>
            </MenuLink>
            <MenuText position="bottom" onClick={() => logUserOut(history)}>
              로그아웃
            </MenuText>
          </AvatarMenu>
        </AvatarContainer>
      </Icon>
      <Icon>
        <DarkModeToggle />
      </Icon>
    </IconsContainer>
  );
};

export default LoggedInHeader;
