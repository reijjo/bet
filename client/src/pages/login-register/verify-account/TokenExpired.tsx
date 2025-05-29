import { Button } from "../../../components";
import { Message } from "../../../components/common/message/Message";
import { useUpdateTokenMutation } from "../../../features/api/authApi";
import { MessageTypes } from "../../../utils/enums";
import { getErrorMessage } from "../../../utils/helperFunctions";

interface TokenExpiredProps {
  token?: string;
}

export const TokenExpired = ({ token }: TokenExpiredProps) => {
  const [
    updateToken,
    {
      data: updateData,
      isLoading: isUpdating,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateTokenMutation();

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
        <p>Get new token</p>
      </div>
      {(isUpdateError || isUpdating) && (
        <Message
          message={
            isUpdating ? "Creating new token..." : getErrorMessage(updateError)
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
          margin="0.5rem 0 0"
          onClick={() =>
            updateToken({
              token: token as string,
            })
          }
        />
      )}
    </>
  );
};
