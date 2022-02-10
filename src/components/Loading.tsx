import styled from "styled-components";
import spinner from "../asset/loading.svg";

const Loader = styled.div<{ screen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.screen ? "100vh" : "100%")};
`;

const Svg = styled.img<{ size: number }>`
  width: ${(props) => props.size}rem;
`;

interface ILoadingProps {
  size: number;
  screen: boolean;
}

const Loading: React.FC<ILoadingProps> = ({ size, screen }) => {
  return (
    <Loader screen={screen}>
      <Svg src={spinner} size={size}></Svg>
    </Loader>
  );
};

export default Loading;
