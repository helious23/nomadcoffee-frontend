import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";

const Container = styled.div`
  margin-top: 6rem;
`;

interface IParamsProps {
  username: string;
}
const EditProfile = () => {
  const { username } = useParams<IParamsProps>();

  return (
    <Container>
      <PageTitle title={`${username} 님의 프로필`} />
      Edit Profile
    </Container>
  );
};

export default EditProfile;
