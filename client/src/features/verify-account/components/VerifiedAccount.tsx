import "./VerifyComponents.css";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { RegisterUserApiResponse } from "../../../utils/api-response-types";
import { UserRoles } from "../../../utils/enums";
import { Loading, Button2, Error } from "../../../components";
import { useUpdateUserMutation } from "../api/verifyApiSlice";

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
    <div className="no-account">
      <h3>Thanks for registering!</h3>
      <div style={{ gap: "0.5rem", display: "flex", flexDirection: "column" }}>
        <p>You can now log in with</p>
        <h4 style={{ color: "var(--accent-100)" }}>{data?.data?.username} /</h4>
        <h4 style={{ color: "var(--accent-100)" }}>{data?.data?.email}</h4>
        <p>and your password.</p>
      </div>
      <Button2
        type="button"
        className="btn2-cta"
        children="To login"
        width="100%"
        margin="1rem 0 0"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};
