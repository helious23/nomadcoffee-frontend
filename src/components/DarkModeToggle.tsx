import styled from "styled-components";
import { darkModeVar, enableDarkMode, disableDarkMode } from "../apollo";

const DarkModeBtn = styled.div<{ position: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 3rem;
  background-color: ${(props) => props.theme.fontColor};
  border-radius: 1rem;
  cursor: pointer;
`;

const Circle = styled.div<{ position: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.position ? "translateX(1rem)" : "translateX(-1rem)"};
`;

const DarkModeToggle = () => {
  const isDark = darkModeVar();
  return (
    <DarkModeBtn
      position={isDark}
      onClick={isDark ? () => disableDarkMode() : () => enableDarkMode()}
    >
      <Circle position={isDark} />
    </DarkModeBtn>
  );
};

export default DarkModeToggle;
