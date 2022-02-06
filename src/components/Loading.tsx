import styled from "styled-components";
import spinner from "../asset/loading.svg";

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.img<{ size: number }>`
  width: ${(props) => props.size}rem;
`;

interface ILoadingProps {
  size: number;
}

const Loading: React.FC<ILoadingProps> = ({ size }) => {
  return (
    <Loader>
      <Svg src={spinner} size={size}></Svg>
    </Loader>
  );
};

export default Loading;
