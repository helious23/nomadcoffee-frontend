import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const SAvatar = styled.div<{ size: number }>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.borderColor};
  transition: all 0.5s ease-in-out;
  svg {
    font-size: ${(props) => props.size * 0.6}rem;
    color: ${(props) => props.theme.fontColor};
  }
`;

const Img = styled.img`
  max-width: 100%;
`;

interface IAvatarProps {
  url: string | undefined | null;
  size?: number;
}

const Avatar: React.FC<IAvatarProps> = ({ url = "", size = 1 }) => {
  return (
    <SAvatar size={size}>
      {url ? (
        <Img src={url} alt={"avatar"} />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </SAvatar>
  );
};

export default Avatar;
