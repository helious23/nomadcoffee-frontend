import { faCoffee, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useViewportScroll, motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../routes";

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const Text = styled.div`
  width: 20vw;
  height: 50vh;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.fontColor};
  z-index: 30;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Close = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: ${(props) => props.theme.textGrey};
  cursor: pointer;
  svg {
    font-size: 1.2rem;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 2rem;
`;

const Subtitle = styled.div`
  margin-top: 2rem;

  font-size: 1rem;
  text-align: center;
  line-height: 1.5rem;
`;

const Action = styled(Link)`
  margin-top: 5rem;
  color: ${(props) => props.theme.accent};
  font-size: 1rem;
  border: 2px solid ${(props) => props.theme.accent};
  padding: 1rem 2rem;
  border-radius: 3rem;
  cursor: pointer;
  svg {
    font-size: 1.2rem;
  }
`;

const ActionText = styled.span`
  margin-left: 1rem;
`;

const Oneline = styled.div`
  display: flex;
`;

const FirstText = styled.div`
  margin-left: 0.3rem;
`;

const Twoline = styled.div``;

interface ILoginNoticeProps {
  handleClose: () => void;
  text: string;
  text2: string;
}

const LoginNotice: React.FC<ILoginNoticeProps> = ({
  handleClose,
  text,
  text2,
}) => {
  const { scrollY } = useViewportScroll();
  return (
    <AnimatePresence>
      <Overlay
        key={1}
        style={{ top: scrollY.get() }}
        onClick={() => handleClose()}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} // 적용 안됨 ㅠㅠ
      />
      <Text style={{ top: scrollY.get() + 200 }}>
        <Close onClick={() => handleClose()}>
          <FontAwesomeIcon icon={faTimes} />
        </Close>
        <Title>로그인</Title>
        <Subtitle>
          <Oneline>
            <div>로그인 하면 </div>
            <FirstText>{text}</FirstText>
          </Oneline>
          <Twoline>{text2}</Twoline>
        </Subtitle>
        <Action to={routes.login} onClick={() => handleClose()}>
          <FontAwesomeIcon icon={faCoffee} />
          <ActionText> 로그인 하러 가기</ActionText>
        </Action>
      </Text>
    </AnimatePresence>
  );
};

export default LoginNotice;
