import "./VerifyPage.css";

import { useParams } from "react-router-dom";

import { Container2, Loading } from "../../components";
import {
  NoAccount,
  InvalidToken,
  TokenExpired,
  VerifiedAccount,
} from "../../features/verify-account";
import { useVerifyUserQuery } from "../../features/verify-account/api/verifyApiSlice";
import { getErrorStatus } from "../../utils/errors/error-helpers";
import { RegisterUserApiResponse } from "../../utils/api-response-types";

const VerifyPage = () => {
  const { token } = useParams();

  const { data, isLoading, isError, error } = useVerifyUserQuery(
    token as string,
    {
      skip: !token,
    }
  );

  const renderComponent = () => {
    if (isLoading) return <Loading />;
    if (isError && getErrorStatus(error) === 404) return <NoAccount />;
    if (isError && getErrorStatus(error) === 401) return <InvalidToken />;
    if (isError && getErrorStatus(error) === 400)
      return <TokenExpired token={token} />;
    return <VerifiedAccount data={data as RegisterUserApiResponse} />;
  };

  return (
    <section className="verify-page">
      <Container2 width="min(500px, 95%)" className="justify-center">
        {renderComponent()}
      </Container2>
    </section>
  );
};

export default VerifyPage;
