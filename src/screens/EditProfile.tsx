import { useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { useMe } from "../hooks/useMe";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { scrollVar } from "../apollo";
import ConfirmNotice from "../components/ConfirmNotice";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { SButton } from "../components/auth/Button";
import AddressInput from "../components/AddressInput";
import { ErrorOutput, OutlineBtn } from "../components/shared";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  editProfile,
  editProfileVariables,
} from "../__generated__/editProfile";
import FormError from "../components/auth/FormError";
import Loading from "../components/Loading";
import { useHistory } from "react-router";

const EDIT_PROFILE = gql`
  mutation editProfile(
    $username: String
    $name: String
    $email: String
    $password: String
    $location: String
    $avatarURL: Upload
    $githubUsername: String
  ) {
    editProfile(
      username: $username
      name: $name
      email: $email
      password: $password
      location: $location
      avatarURL: $avatarURL
      githubUsername: $githubUsername
    ) {
      ok
      error
      avatarURL
    }
  }
`;

const Container = styled.div`
  margin-top: 6rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  width: 100%;
`;

const TitleContainer = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
`;

const AvatarFile = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;

const AvatarInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 2rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boxBgColor};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease-in-out;
`;

const AvatarInput = styled.input`
  margin-top: 1rem;
`;

const Text = styled.div`
  font-size: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 2rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boxBgColor};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease-in-out;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40vw;
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  width: 10vw;
`;
const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.boxBgColor};
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  transition: all 0.5s ease-in-out;
  font-size: 1rem;
  width: 100%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const AddInput = styled(Input)`
  width: 70%;
`;

const AddBtnContainer = styled.div`
  width: 30%;
  padding: 0 1rem;
`;

const AddressBtn = styled(OutlineBtn)``;

const GithubDefault = styled(Input)`
  background-color: ${(props) => props.theme.boxBgColor};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  border-right: none;
  width: 20%;
  height: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textGrey};
`;

const GithubInput = styled(Input)`
  width: 80%;
  height: 2.4rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-right: 2rem;
`;

const SubmitBtn = styled(SButton)`
  width: 10vw;
  cursor: pointer;
  padding: 0.5rem;
`;

interface IParamsProps {
  userId: string;
}

interface IFormProps {
  username: string;
  name: string;
  email: string;
  password: string;
  location: string;
  avatar: File;
  githubUsername: string;
  result?: string;
}
type ImageInfo = {
  localUrl: string | ArrayBuffer | null;
};

const EditProfile = () => {
  const client = useApolloClient();
  const { userId } = useParams<IParamsProps>();
  const { data: userData } = useMe();
  const [addressOpen, setAddressOpen] = useState(false);
  const [addressData, setAddressData] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<ImageInfo>();
  const history = useHistory();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState,
  } = useForm<IFormProps>();

  const [editProfileMutation, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE);

  const onAddressClick = () => {
    clearEditProfileError();
    setAddressOpen(true);
    setAddressData("");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    scrollVar(true);
  };
  const handleClose = () => {
    setOpen(false);
    scrollVar(false);
  };
  const onValid = () => {
    handleOpen();
  };

  const updateUserCache = (avatarURL: string | null) => {
    const { cache } = client;
    const {
      username: newUsername,
      name,
      email,
      githubUsername,
      location,
    } = getValues();
    cache.modify({
      id: `User:${userId}`,
      fields: {
        username() {
          return newUsername;
        },
        name() {
          return name;
        },
        email() {
          return email;
        },
        ...(location && {
          location() {
            return location;
          },
        }),
        ...(githubUsername && {
          githubUsername() {
            return githubUsername;
          },
        }),
        ...(avatarURL !== null && {
          avatarURL() {
            return avatarURL;
          },
        }),
      },
    });
  };

  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { error, ok, avatarURL },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    } else if (ok) {
      updateUserCache(avatarURL);
      alert("프로필이 수정되었습니다");
      history.goBack();
    }
  };

  const mutationTrigger = () => {
    handleClose();
    const { username, name, email, githubUsername, location } = getValues();
    editProfileMutation({
      variables: {
        username,
        name,
        email,
        githubUsername,
        location,
        avatarURL: file,
      },
      onCompleted,
      // refetchQueries: [ME_QUERY, "me"],
    });
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImage({ localUrl: reader.result });
      };
    }
  }, [file]);

  useEffect(() => {
    if (userData?.me) {
      setValue("username", userData.me.username);
      setValue("name", userData.me.name);
      setValue("email", userData.me.email);
      if (userData.me.location) {
        setValue("location", userData.me.location);
      }
      if (userData.me.githubUsername) {
        setValue("githubUsername", userData.me.githubUsername);
      }
    }
  }, [userData, setValue]);

  useEffect(() => {
    if (addressData) {
      setValue("location", addressData);
    }
  }, [addressData, setValue]);

  const clearEditProfileError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    clearEditProfileError();
    const file = event.target.files;
    if (file) {
      setImage(undefined);
      setFile(file[0]);
    }
  };

  return (
    <Container>
      <PageTitle title={`${userData?.me?.username} 님의 프로필`} />
      {loading ? (
        <Loading screen={true} size={6} />
      ) : (
        <Form onSubmit={handleSubmit(onValid)}>
          <FormContainer>
            <TitleContainer>
              <Title>프로필 정보</Title>
              {image ? (
                <AvatarFile
                  style={{ backgroundImage: `url(${image.localUrl})` }}
                />
              ) : (
                <Avatar url={userData?.me?.avatarURL} size={8} />
              )}
              <AvatarInputContainer>
                <Text>아바타 수정하기</Text>
                <AvatarInput
                  type="file"
                  accept="image/*"
                  {...register("avatar")}
                  onChange={onFileUpload}
                />
              </AvatarInputContainer>
            </TitleContainer>
            <InfoContainer>
              <InputContainer>
                <Label htmlFor="username">사용자 이름</Label>
                <Input
                  type="text"
                  id="username"
                  {...register("username", { required: true })}
                  onKeyDown={clearEditProfileError}
                  hasError={Boolean(formState.errors.username)}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="name">이름</Label>
                <Input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  onKeyDown={clearEditProfileError}
                  hasError={Boolean(formState.errors.name)}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="email">이메일</Label>
                <Input
                  type="text"
                  id="email"
                  {...register("email", { required: true })}
                  onKeyDown={clearEditProfileError}
                  hasError={Boolean(formState.errors.email)}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="location">주소</Label>
                <AddInput
                  type="text"
                  id="location"
                  {...register("location")}
                  onKeyDown={clearEditProfileError}
                  hasError={Boolean(formState.errors.location)}
                />
                <AddBtnContainer>
                  <AddressBtn onClick={onAddressClick}>주소 검색</AddressBtn>
                </AddBtnContainer>
                {addressOpen ? (
                  <AddressInput
                    setAddressOpen={setAddressOpen}
                    setAddressData={setAddressData}
                  />
                ) : null}
              </InputContainer>
              <InputContainer>
                <Label htmlFor="githubUsername">깃허브 아이디</Label>
                <GithubDefault as="span">github.com/</GithubDefault>
                <GithubInput
                  type="text"
                  id="githubUsername"
                  {...register("githubUsername")}
                  onKeyDown={clearEditProfileError}
                  hasError={Boolean(formState.errors.githubUsername)}
                />
              </InputContainer>
            </InfoContainer>
          </FormContainer>
          <ErrorOutput>
            <FormError message={formState?.errors?.result?.message} />
          </ErrorOutput>
          <BtnContainer>
            <SubmitBtn>프로필 수정하기</SubmitBtn>
          </BtnContainer>
        </Form>
      )}
      {open ? (
        <ConfirmNotice
          handleClose={handleClose}
          mutationTrigger={mutationTrigger}
          title={"프로필 수정"}
          text={"프로필을 수정 하시겠습니까?"}
          iconName={faEdit}
        />
      ) : null}
    </Container>
  );
};

export default EditProfile;
