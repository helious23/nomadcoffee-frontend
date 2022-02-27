import { useReactiveVar } from "@apollo/client";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, profileVar, onMenuClose } from "../apollo";
import routes from "../routes";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import MainLogo from "./header/MainLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LoggedInHeader from "./header/LoggedInHeader";
import LoggedOutHeader from "./header/LoggedOutHeader";

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

const Column = styled.div`
  display: flex;
`;

const SearchForm = styled.form<{ home: boolean }>`
  margin-left: 5rem;
  width: 30vw;
  display: ${(props) => (props.home ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    left: 0.5rem;
    color: ${(props) => props.theme.textGrey};
    font-size: 1.5rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 2.5rem;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  transition: all 0.5s ease-in-out;
  font-size: 1rem;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const profileVisible = useReactiveVar(profileVar);
  const { scrollY } = useViewportScroll();
  const menuAnimation = useAnimation();
  const navAnimation = useAnimation();
  const homeMatch = useRouteMatch(routes.home);
  const [home, setHome] = useState(false);

  const navVariants = {
    top: {
      backgroundColor: home ? "rgba(0,0,0,0)" : "rgba(58, 35, 6, 0.9)",
      boxShadow: home
        ? "0px 0px 0px rgba(0, 0, 0, 0)"
        : "0px 2px 25px rgba(0, 0, 0, 0.5)",
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

  useEffect(() => {
    if (!profileVisible) {
      menuAnimation.start({
        scaleY: 0,
      });
    }
  }, [profileVisible, menuAnimation]);

  useEffect(() => {
    if (homeMatch?.isExact) {
      setHome(true);
    }
  }, [homeMatch?.isExact]);

  return (
    <SHeader
      animate={navAnimation}
      initial="top"
      variants={navVariants}
      onClick={() => onMenuClose(profileVisible)}
    >
      <Wrapper>
        <Column>
          <MainLogo />
          <SearchForm action="/search" method="GET" home={home}>
            <FontAwesomeIcon icon={faSearch} />
            <SearchInput type="text" placeholder="검색" name="keyword" />
          </SearchForm>
        </Column>
        <Column>
          {isLoggedIn ? (
            <LoggedInHeader menuAnimation={menuAnimation} />
          ) : (
            <LoggedOutHeader />
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
