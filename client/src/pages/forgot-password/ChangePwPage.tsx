import "./ForgotPwPage.css";

import { useParams } from "react-router-dom";
import { ChangePwForm } from "../../features/forgot-password/components/ChangePwForm";
import { useCheckTokenQuery } from "../../features/forgot-password/api/forgotPwApiSlice";
import { Loading } from "../../components";
import {
  NoAccount,
  InvalidToken,
  TokenExpired,
} from "../../features/verify-account";
import { getErrorStatus } from "@utils/errors/error-helpers";
import { RegisterUserApiResponse } from "../../utils/api-response-types";

const ChangePwPage = () => {
  const { token } = useParams();

  console.log("TOKEN", token);

  const { data, isLoading, isError, error } = useCheckTokenQuery(
    token as string,
    {
      skip: !token,
    }
  );

  console.log("data", data);

  const renderComponent = () => {
    if (isLoading) return <Loading />;
    if (isError && getErrorStatus(error) === 404) return <NoAccount />;
    if (isError && getErrorStatus(error) === 401) return <InvalidToken />;
    if (isError && getErrorStatus(error) === 400)
      return <TokenExpired token={token} />;
    return <ChangePwForm data={data as RegisterUserApiResponse} />;
  };

  return (
    <section className="forgot-page">
      <div className="forgot-content">{renderComponent()}</div>
    </section>
  );
};

export default ChangePwPage;
