import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import routes from "../routes";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import MainLogo from "./header/MainLogo";
import DarkModeToggle from "./DarkModeToggle";
import { useMe } from "../hooks/useMe";

const SHeader = styled(motion.header)`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 1rem 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const Wrapper = styled.div`
  max-width: 90vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 3rem;
  cursor: pointer;
`;

const HeaderText = styled.span`
  color: white;
  font-weight: 500;
  font-size: 1rem;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
  svg {
    font-size: 1.2rem;
  }
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { scrollY } = useViewportScroll();
  const navAnimation = useAnimation();
  const { data: userData } = useMe();

  const navVariants = {
    top: {
      backgroundColor: "rgba(0,0,0,0)",
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    scroll: {
      backgroundColor: "rgba(58, 35, 6, 0.9)",
      boxShadow: "0px 2px 25px rgba(0, 0, 0, 0.5)",
    },
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 250) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <SHeader animate={navAnimation} initial="top" variants={navVariants}>
      <Wrapper>
        <Column>
          <MainLogo />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Link to={routes.home}>
                  <HeaderText>카테고리</HeaderText>
                </Link>
              </Icon>
              <Icon>
                <Link to={`/likes/${userData?.me?.username}`}>
                  <HeaderText>위시 리스트</HeaderText>
                </Link>
              </Icon>
              <Icon>
                <Link to={`/users/${userData?.me?.username}`}>
                  <HeaderText>프로필</HeaderText>
                </Link>
              </Icon>
              <Icon onClick={() => logUserOut()}>
                <HeaderText>로그아웃</HeaderText>
              </Icon>
              <Icon>
                <DarkModeToggle />
              </Icon>
            </IconsContainer>
          ) : (
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
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
