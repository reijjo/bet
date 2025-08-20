import { Button2, Message } from "../../../components";
import { MessageTypes } from "../../../utils/enums";
import { getErrorMessage } from "../../../utils/helperFunctions";
import { useUpdateTokenMutation } from "../api/verifyApiSlice";

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

  const refreshToken = async (token: string) => {
    await updateToken({ token });
    window.location.reload();
  };

  return (
    <div className="no-account">
      <h4>Verify token expired</h4>
      <p>Get new token.</p>

      {(isUpdateError || isUpdating) && (
        <Message
          message={
            isUpdating ? "Creating new token..." : getErrorMessage(updateError)
          }
          type={isUpdating ? MessageTypes.Info : MessageTypes.Error}
          width="100%"
        />
      )}
      {!updateData && (
        <Button2
          type="button"
          className="btn2-cta btn-top-margin"
          onClick={() => refreshToken(token as string)}
        >
          Refresh Token
        </Button2>
      )}
    </div>
  );
};
