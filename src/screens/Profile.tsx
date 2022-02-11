import { Link, useHistory, useParams } from "react-router-dom";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
  useQuery,
} from "@apollo/client";
import { SHOP_FRAGMENT } from "../fragments";
import defaultImage from "../asset/default_cafe_img.jpeg";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import { FatText, OutlineBtn } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { useMe } from "../hooks/useMe";
import {
  seeProfile,
  seeProfileVariables,
  seeProfile_seeProfile,
} from "../__generated__/seeProfile";
import {
  toggleFollow,
  toggleFollowVariables,
} from "../__generated__/toggleFollow";
import Loading from "../components/Loading";
import { isLoggedInVar } from "../apollo";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const TOGGLE_FOLLOW_USER = gql`
  mutation toggleFollow($username: String!) {
    toggleFollow(username: $username) {
      ok
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      id
      name
      username
      location
      avatarURL
      githubUsername
      totalShops
      totalFollowing
      totalFollowers
      isFollowing
      isMe
      shops(page: $page) {
        ok
        error
        totalPages
        results {
          ...ShopFragment
        }
      }
    }
  }
  ${SHOP_FRAGMENT}
`;

const Container = styled.div`
  padding-top: 8rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
`;
const Avatar = styled.img`
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  margin-right: 10rem;
`;

const AvatarContainer = styled(Avatar).attrs({ as: "div" })`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.fontColor};
  svg {
    font-size: 6rem;
    color: ${(props) => props.theme.fontColor};
  }
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  margin-right: 1rem;
`;
const Row = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GithubLink = styled(Text)`
  color: ${(props) => props.theme.linkColor};
  svg {
    margin-left: 0.2rem;
    font-size: 0.8rem;
  }
`;

const Github = styled.div``;

const GithubUsername = styled.div``;

const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 1.5rem;
`;
const Value = styled(FatText)`
  font-size: 1rem;
`;
const Name = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 16rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  padding-bottom: 5rem;
`;

const Photo = styled.div<{ bg: string | null | undefined }>`
  background-image: url(${(props) => (props.bg ? props.bg : defaultImage)});
  background-size: cover;
  position: relative;
  cursor: pointer;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 1rem;
    margin-right: 5px;
  }
`;

interface IParams {
  username: string;
}

const Profile = () => {
  const { username } = useParams<IParams>();
  const [page, setPage] = useState(1);
  const { data: userData } = useMe();
  const isLoggedIn = isLoggedInVar();
  const history = useHistory();

  const updateToggleFollow: MutationUpdaterFunction<
    toggleFollow,
    toggleFollowVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          toggleFollow: { ok },
        },
      } = result;
      if (!ok) {
        return;
      } else {
        cache.modify({
          id: `User:${username}`,
          fields: {
            isFollowing(prev) {
              return !prev;
            },
            totalFollowers(prev, { readField }) {
              if (readField("isFollowing")) {
                if (userData?.me) {
                  const { me } = userData;
                  cache.modify({
                    id: `User:${me.username}`,
                    fields: {
                      totalFollowing(prev) {
                        return prev - 1;
                      },
                    },
                  });
                }
                return prev - 1;
              } else {
                if (userData?.me) {
                  const { me } = userData;
                  cache.modify({
                    id: `User:${me.username}`,
                    fields: {
                      totalFollowing(prev) {
                        return prev + 1;
                      },
                    },
                  });
                }
                return prev + 1;
              }
            },
          },
        });
      }
    }
  };

  const [toggleFollowUser] = useMutation<toggleFollow, toggleFollowVariables>(
    TOGGLE_FOLLOW_USER,
    {
      variables: {
        username: username,
      },
      update: updateToggleFollow,
      // refetchQueries: [
      //   { query: SEE_COFFEE_SHOPS_QUERY, variables: { page: 1 } },
      // ],
    }
  );

  const { data, loading } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
        page,
      },
    }
  );

  const getButton = (seeProfile: seeProfile_seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return (
        <Link to={`/edit-profile/${userData?.me?.username}/edit`}>
          <OutlineBtn>프로필 수정</OutlineBtn>
        </Link>
      );
    }
    if (isFollowing) {
      return (
        <OutlineBtn onClick={() => toggleFollowUser()}>팔로우 취소</OutlineBtn>
      );
    } else {
      return <OutlineBtn onClick={() => toggleFollowUser()}>팔로우</OutlineBtn>;
    }
  };
  return loading ? (
    <Loading size={6} screen={true} />
  ) : (
    <Container>
      <PageTitle title={`${data?.seeProfile?.username}'s Profile`} />
      <Header>
        {data?.seeProfile?.avatarURL ? (
          <Avatar src={data?.seeProfile?.avatarURL} />
        ) : (
          <AvatarContainer>
            <FontAwesomeIcon icon={faUser} />
          </AvatarContainer>
        )}
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {isLoggedIn && data?.seeProfile
              ? getButton(data?.seeProfile)
              : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  등록한 카페 <Value>{data?.seeProfile?.totalShops}</Value>
                </span>
              </Item>
              <Item>
                <span>
                  팔로워 <Value>{data?.seeProfile?.totalFollowers}</Value>
                </span>
              </Item>
              <Item>
                <span>
                  팔로우 <Value>{data?.seeProfile?.totalFollowing}</Value>
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Text>이름</Text>
            <Name>{data?.seeProfile?.name}</Name>
          </Row>
          {data?.seeProfile?.githubUsername ? (
            <Row
              as="a"
              href={`https://github.com/${data.seeProfile.githubUsername}`}
              target="_blank"
            >
              <GithubLink>
                깃허브{" "}
                <span>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </span>
              </GithubLink>
              <Github>github.com/</Github>
              <GithubUsername>
                {data?.seeProfile?.githubUsername}
              </GithubUsername>
            </Row>
          ) : null}
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.shops.results &&
          data?.seeProfile?.shops?.results
            .map(
              (shop) =>
                shop && (
                  <Photo
                    key={shop.id}
                    bg={shop.photos && shop.photos[0]?.url}
                    onClick={() => history.push(`/shop/${shop.id}`)}
                  >
                    <Icons>
                      <Icon>
                        <FontAwesomeIcon icon={faHeart} />
                        {shop.likes}
                      </Icon>
                      <Icon>
                        <FontAwesomeIcon icon={faComment} />
                        {shop.commentNumber}
                      </Icon>
                    </Icons>
                  </Photo>
                )
            )
            .reverse()}
      </Grid>
    </Container>
  );
};

export default Profile;
