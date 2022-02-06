import styled from "styled-components";

interface ILogoProps {
  logoFile: string;
  size: string;
}

const LogoImg = styled.img<{ size: string }>`
  width: ${(props) => props.size}rem;
  position: relative;
`;

const Logo: React.FC<ILogoProps> = ({ logoFile, size }) => {
  return <LogoImg src={logoFile} alt="logo" size={size} />;
};

export default Logo;
