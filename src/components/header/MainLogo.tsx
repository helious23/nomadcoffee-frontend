import styled from "styled-components";
import Logo from "../Logo";
import mainLogo from "../../asset/nomad_offee_logo.svg";
import c from "../../asset/c.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import routes from "../../routes";

const Container = styled(motion.div)``;

const ChangeWord = styled(motion.img)`
  width: 1rem;
  margin-right: -0.7rem;
`;

const MainLogo = () => {
  return (
    <Container>
      <Link to={routes.home}>
        <ChangeWord
          src={c}
          initial={{}}
          animate={{
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
            transition: { repeat: Infinity, duration: 12 },
          }}
        />
        <Logo logoFile={mainLogo} size="6" />
      </Link>
    </Container>
  );
};

export default MainLogo;
