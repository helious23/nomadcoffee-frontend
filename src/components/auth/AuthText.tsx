import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: 600;
`;

const SubTitle = styled.div`
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 500;
`;

interface IAuthTextProps {
  title: string;
  subtitle: string;
}

const AuthText: React.FC<IAuthTextProps> = ({ title, subtitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Container>
  );
};

export default AuthText;
