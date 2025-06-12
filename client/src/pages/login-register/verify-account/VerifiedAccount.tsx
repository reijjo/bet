import { useNavigate } from "react-router-dom";

import { Button, Error, Loading } from "../../../components";
import { RegisterUserApiResponse } from "../../../utils/api-response-types";
import { useEffect } from "react";
import { useUpdateUserMutation } from "../../../features/api/userApi";
import { UserRoles } from "../../../utils/enums";

interface VerifiedAccountProps {
  data: RegisterUserApiResponse;
}

export const VerifiedAccount = ({ data }: VerifiedAccountProps) => {
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.id) {
      updateUser({ id: data.data.id, role: UserRoles.Guest });
    }
  }, [data?.data?.id, updateUser]);

  if (isLoading) return <Loading text="Updating user role..." />;
  if (isError) return <Error error={error} />;

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
      <div style={{ gap: "0.5rem", display: "flex", flexDirection: "column" }}>
        <p>You can now log in with</p>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Username:</p>
          <h4 style={{ color: "var(--accent-100)" }}>{data?.data?.username}</h4>
        </div>
        <p>or</p>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Email:</p>
          <h4 style={{ color: "var(--accent-100)" }}>{data?.data?.email}</h4>
        </div>
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
};
