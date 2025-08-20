import { useNavigate } from "react-router-dom";

import { Button } from "../../../components";

export const NoAccount = () => {
  const navigate = useNavigate();
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
        margin="0.5rem 0 0"
        onClick={() => navigate("/register")}
      />
    </>
  );
};
