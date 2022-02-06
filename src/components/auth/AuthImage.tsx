import styled from "styled-components";
import loginImage from "../../asset/login_image.jpeg";

const Image = styled.img`
  width: 50vw;
  height: 100vh;
  background-image: url(${loginImage});
  background-size: cover;
  background-position: center;
`;

const AuthImage = () => {
  return <Image />;
};

export default AuthImage;
