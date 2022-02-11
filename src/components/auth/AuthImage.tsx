import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import loginImage from "../../asset/login_image.jpeg";

const Image = styled(motion.img)`
  width: 50vw;
  height: 100vh;
  background-image: url(${loginImage});
  background-size: cover;
  background-position: center;
`;

const AuthImage = () => {
  return (
    <AnimatePresence>
      <Image
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
      />
    </AnimatePresence>
  );
};

export default AuthImage;
