import { useNavigate } from "react-router-dom";

import { Button } from "../../../components";
import { FinishUserResponse } from "../../../utils/api-response-types";

interface VerifiedAccountProps {
  data: FinishUserResponse;
}

export const VerifiedAccount = ({ data }: VerifiedAccountProps) => {
  const navigate = useNavigate();

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
        <div>
          <h4>{data?.data.username}</h4>
        </div>
        <p>or</p>
        <h4>{data?.data.email}</h4>
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
