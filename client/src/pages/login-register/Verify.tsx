import "./LoginRegister.css";

import { ChangeEvent, FormEvent, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button, Container, Loading, TextInput } from "../../components";
import { Message } from "../../components/common/message/Message";
import {
  useFinishRegisterMutation,
  useUpdateTokenMutation,
  useVerifyQuery,
} from "../../features/api/authApi";
import { initialRegisterValues } from "../../utils/defaults/defaults";
import { MessageTypes } from "../../utils/enums";
import { isErrorWithData } from "../../utils/typeGuards";
import { ApiErrorResponse, RegisterValues } from "../../utils/types";

export const Verify = () => {
  const { token } = useParams();

  const { data, isLoading, isError, error } = useVerifyQuery(token as string, {
    skip: !token,
  });
  const [
    updateToken,
    {
      data: updateData,
      isLoading: isUpdating,
      isError: isUpdateError,
      // error: updateError,
    },
  ] = useUpdateTokenMutation();
  const [
    finishRegister,
    {
      data: finishData,
      isLoading: isFinishing,
      isError: isFinishError,
      error: finishError,
    },
  ] = useFinishRegisterMutation();

  const [regUser, setRegUser] = useState<RegisterValues>({
    ...initialRegisterValues,
    email: data?.data ?? "",
  });

  const navigate = useNavigate();

  const apiError = error as { data: ApiErrorResponse };

  const getErrorMessage = (error: unknown): string => {
    if (isErrorWithData(error) && error.data?.message) {
      return error.data.message;
    }

    return "An unexpected error occurred";
  };

  const handleVerifyInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegUser({ ...regUser, [name]: value });
  };

  const handleFinishAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    finishRegister(regUser);
  };

  const renderComponent = () => {
    if (isLoading) return <Loading />;

    if (isError && apiError.data.status === 404) {
      return (
        <>
          <div
            style={{
              textAlign: "center",
              textWrap: "balance",
              width: "75%",
              gap: "0.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>No account found</h4>
            <p>Please register</p>
          </div>
          <Button
            type="button"
            className="btn btn-filled"
            children="Register"
            width="75%"
            margin="1rem 0 0"
            onClick={() => navigate("/register")}
          />
        </>
      );
    }

    if (isError && apiError.data.status === 400) {
      return (
        <>
          <div
            style={{
              textAlign: "center",
              textWrap: "balance",
              width: "75%",
              gap: "0.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>Verify token expired</h4>
            <p>Get new token for</p>
            <h6>{apiError.data.message}</h6>
          </div>
          {(isUpdateError || isUpdating) && (
            <Message
              message={
                isUpdating ? "Creating new token..." : apiError.data.message
              }
              type={isUpdating ? MessageTypes.Info : MessageTypes.Error}
              width="75%"
            />
          )}
          {updateData && (
            <Message
              message={updateData.message}
              type={MessageTypes.Success}
              width="75%"
            />
          )}
          {!updateData && (
            <Button
              type="button"
              className="btn btn-filled"
              children={"Refresh token"}
              width="75%"
              margin="1rem 0 0"
              onClick={() =>
                updateToken({
                  token: token as string,
                  email: apiError.data.message,
                })
              }
            />
          )}
        </>
      );
    }

    if (finishData) {
      return (
        <div
          style={{
            textAlign: "center",
            textWrap: "balance",
            width: "75%",
            gap: "0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Thanks for registering!</h3>
          <div
            style={{ gap: "0.5rem", display: "flex", flexDirection: "column" }}
          >
            <p>You can now log in with</p>
            <div>
              <h4>{finishData?.data.username}</h4>
            </div>
            <p>or</p>
            <h4>{finishData?.data.email}</h4>
            <p>and your password.</p>
          </div>
          <Button
            type="button"
            className="btn btn-filled"
            children="To login"
            width="100%"
            margin="1rem 0 0"
            onClick={() => navigate("/login")}
          />
        </div>
      );
    }

    return (
      <form className="form-register" onSubmit={handleFinishAccount}>
        <p className="form-header" style={{ marginBottom: 0 }}>
          Finish your account
        </p>
        <p style={{ marginBottom: 8 }}>{data?.data}</p>
        <TextInput
          className="form-input-text"
          type="text"
          label="Username"
          name="username"
          id="username"
          placeholder="username"
          onChange={handleVerifyInput}
        />
        <TextInput
          className="form-input-text"
          type="text"
          label="Password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleVerifyInput}
        />
        <TextInput
          className="form-input-text"
          type="text"
          label="Confirm password"
          name="password2"
          id="password2"
          placeholder="confirm password"
          onChange={handleVerifyInput}
        />
        {(isFinishing || isFinishError) && (
          <Message
            message={
              isFinishing
                ? "Finishing your account..."
                : getErrorMessage(finishError)
            }
            type={isFinishing ? MessageTypes.Info : MessageTypes.Error}
            width="75%"
          />
        )}
        <Button
          type="submit"
          className="btn btn-filled"
          children="create account"
          width="75%"
          margin="1rem 0 0"
        />
      </form>
    );
  };

  console.log("finishData", finishData);
  console.log("isFinishing", isFinishing);
  console.log("isFinishError", isFinishError);
  console.log("finishError", finishError);

  return (
    <Container
      width="min(400px, 95%)"
      border="0.5px solid"
      borderColor="var(--primary-700)"
      padding="24px 16px"
      margin="0 auto"
      alignSelf="center"
      boxShadow="var(--box-shadow)"
      gap="16px"
    >
      {renderComponent()}
    </Container>
  );
};
