import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import {
  AuthLabel,
  AuthPlaceholder,
  DarkModeContainer,
  ErrorOutput,
  LogOutPage,
} from "../components/shared";
import { Link, useHistory } from "react-router-dom";
import Seperator from "../components/auth/Seperator";
import { Button } from "../components/auth/Button";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import BottomBox from "../components/BottomBox";
import AuthInput from "../components/auth/AuthInput";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import AuthImage from "../components/auth/AuthImage";
import DarkModeToggle from "../components/DarkModeToggle";
import AuthText from "../components/auth/AuthText";
import AuthHeader from "../components/auth/AuthHeader";

const SignUpForm = styled.form`
  margin-top: 2rem;
`;

const SIGN_UP_MUTATION = gql`
  mutation createAccount(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

interface ISignUpProps {
  name: string;
  username: string;
  email: string;
  password: string;
  result?: string;
}

interface IHistoryProps {
  message?: string;
  username?: string;
  password?: string;
}

const SignUp = () => {
  const history = useHistory<IHistoryProps>();
  const {
    register,
    handleSubmit,
    formState,
    setError,
    getValues,
    clearErrors,
    watch,
  } = useForm<ISignUpProps>({
    mode: "all",
  });

  const onCompleted = (data: createAccount) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    }
    if (ok) {
      history.push(routes.login, {
        message: "?????? ????????? ?????????????????????. ????????? ?????????.",
        username,
        password,
      });
    }
  };

  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(SIGN_UP_MUTATION, {
    onCompleted,
  });

  const onSignUpValid: SubmitHandler<ISignUpProps> = ({
    name,
    username,
    password,
    email,
  }) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        name,
        username,
        password,
        email,
      },
    });
  };

  const clearCreateError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  return (
    <AuthLayout>
      <AuthHeader />
      <PageTitle title="????????????" />
      <DarkModeContainer>
        <DarkModeToggle border={true} />
      </DarkModeContainer>
      <FormBox>
        <AuthText title="???????????????!" subtitle="????????? ?????? ???????????? : )" />
        <SignUpForm onSubmit={handleSubmit(onSignUpValid)}>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("email"))}>
              ????????? ??????
            </AuthPlaceholder>
            <AuthInput
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "????????? ????????? ????????? ????????????.",
                },
              })}
              hasError={Boolean(formState?.errors?.email)}
              onKeyDown={clearCreateError}
              change={Boolean(watch("email"))}
            />
          </AuthLabel>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("name"))}>
              ??????
            </AuthPlaceholder>
            <AuthInput
              type="text"
              {...register("name", {
                required: true,
              })}
              hasError={Boolean(formState?.errors?.name)}
              onKeyDown={clearCreateError}
              change={Boolean(watch("name"))}
            />
          </AuthLabel>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("username"))}>
              ????????? ??????
            </AuthPlaceholder>
            <AuthInput
              type="text"
              {...register("username", {
                required: true,
              })}
              hasError={Boolean(formState?.errors?.username)}
              onKeyDown={clearCreateError}
              change={Boolean(watch("username"))}
            />
          </AuthLabel>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("password"))}>
              ????????????
            </AuthPlaceholder>
            <AuthInput
              type="password"
              {...register("password", {
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[`~!@#$%^&*,.<>/?(){};:'"|_+=-])(?=.{6})/,
                  message: `??????????????? ?????????, ??????, ???????????? ?????? 6??? ???????????????.`,
                },
              })}
              hasError={Boolean(formState?.errors?.password)}
              onKeyDown={clearCreateError}
              change={Boolean(watch("password"))}
            />
          </AuthLabel>
          <Button
            canClick={!formState.isValid}
            loading={loading}
            actionText={"?????? ??????"}
          />
          <ErrorOutput>
            <FormError message={formState?.errors?.email?.message} />
            <FormError message={formState?.errors?.password?.message} />
            <FormError message={formState?.errors?.result?.message} />
          </ErrorOutput>
        </SignUpForm>
        <Seperator />
        <Link to={routes.home}>
          <LogOutPage>????????? ?????? ????????????</LogOutPage>
        </Link>
        <BottomBox
          cta="????????? ????????????????"
          linkText="?????????"
          link={routes.login}
        />
      </FormBox>
      <AuthImage />
    </AuthLayout>
  );
};

export default SignUp;
