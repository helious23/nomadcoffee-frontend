import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { login, loginVariables } from "../__generated__/login";
import {
  AuthLabel,
  AuthPlaceholder,
  DarkModeContainer,
  ErrorOutput,
  LogOutPage,
} from "../components/shared";
import AuthInput from "../components/auth/AuthInput";
import { Button } from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import routes from "../routes";
import Notification from "../components/auth/Notification";
import FormError from "../components/auth/FormError";
import DarkModeToggle from "../components/DarkModeToggle";
import Seperator from "../components/auth/Seperator";
import BottomBox from "../components/BottomBox";
import AuthText from "../components/auth/AuthText";
import AuthImage from "../components/auth/AuthImage";
import AuthHeader from "../components/auth/AuthHeader";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

const LoginForm = styled.form`
  margin-top: 2rem;
`;

interface ILoginFormProps {
  username: string;
  password: string;
  result?: string;
}

interface IuseLocationProps extends ILoginFormProps {
  message?: string;
}

const Login = () => {
  const location = useLocation<IuseLocationProps>();
  const history = useHistory();
  const { register, handleSubmit, formState, setError, clearErrors, watch } =
    useForm<ILoginFormProps>({
      mode: "onChange",
      defaultValues: {
        username: location?.state?.username || "",
        password: location?.state?.password || "",
      },
    });

  const onCompleted = (data: login) => {
    const {
      login: { error, token },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token, history);
    }
  };

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: onCompleted,
    }
  );

  const onValid: SubmitHandler<ILoginFormProps> = ({ username, password }) => {
    if (loading) {
      return;
    }
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearLoginError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  return (
    <AuthLayout>
      <AuthHeader />
      <DarkModeContainer>
        <DarkModeToggle border={true} />
      </DarkModeContainer>
      <PageTitle title="로그인" />
      <FormBox>
        <AuthText title="안녕하세요!" subtitle="다시 만나 반가워요 : )" />
        <Notification message={location?.state?.message} />
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("username"))}>
              사용자 이름
            </AuthPlaceholder>
            <AuthInput
              type="text"
              {...register("username", {
                required: true,
              })}
              hasError={Boolean(formState.errors.username)}
              change={Boolean(watch("username"))}
              onKeyDown={clearLoginError}
            />
          </AuthLabel>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("password"))}>
              비밀번호
            </AuthPlaceholder>

            <AuthInput
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message: "비밀번호는 4글자 이상 입니다.",
                },
              })}
              hasError={Boolean(formState.errors.password)}
              change={Boolean(watch("password"))}
              onKeyDown={clearLoginError}
            />
          </AuthLabel>
          <Button
            canClick={!formState.isValid}
            loading={loading}
            actionText={"로그인"}
          />
        </LoginForm>
        <ErrorOutput>
          <FormError message={formState?.errors?.result?.message} />
        </ErrorOutput>
        <Seperator />
        <LogOutPage>
          <Link to={routes.home}>
            <span>로그인 없이 살펴보기</span>
          </Link>
        </LogOutPage>
        <BottomBox
          cta="계정이 없으신가요?"
          link={routes.signUp}
          linkText="가입하기"
        />
      </FormBox>
      <AuthImage />
    </AuthLayout>
  );
};

export default Login;
