import styled from "styled-components";
import { darkModeVar, enableDarkMode, disableDarkMode } from "../apollo";

interface ICircleProps {
  position: boolean;
  border?: boolean;
}

const DarkModeBtn = styled.div<{ position: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 3rem;
  background-color: ${(props) => props.theme.accent};
  border-radius: 1rem;
  cursor: pointer;
`;

const Circle = styled.div<ICircleProps>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: white;
  border: 1px solid
    ${(props) => (props.border ? props.theme.accent : "transparent")};
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.position ? "translateX(1rem)" : "translateX(-1rem)"};
`;

interface IDarkModeToggleProps {
  border?: boolean;
}

const DarkModeToggle: React.FC<IDarkModeToggleProps> = ({ border }) => {
  const isDark = darkModeVar();
  const toggleDarkClick = () => {
    if (isDark) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  };
  return (
    <DarkModeBtn position={isDark} onClick={toggleDarkClick}>
      <Circle position={isDark} border={border} />
    </DarkModeBtn>
  );
};

export default DarkModeToggle;
