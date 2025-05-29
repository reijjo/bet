import { useParams } from "react-router-dom";
import { Container, Loading } from "../../../components";

import { useVerifyQuery } from "../../../features/api/authApi";
import { getErrorStatus } from "../../../utils/helperFunctions";
import { NoAccount } from "./NoAccount";
import { InvalidToken } from "./InvalidToken";
import { TokenExpired } from "./TokenExpired";
import { VerifiedAccount } from "./VerifiedAccount";
import { RegisterUserApiResponse } from "../../../utils/api-response-types";

const Verify = () => {
  const { token } = useParams();
  console.log("Verify token:", token);

  const { data, isLoading, isError, error } = useVerifyQuery(token as string, {
    skip: !token,
  });

  console.log("Verify data:", data);
  console.log("Verify error:", error);

  const renderComponent = () => {
    if (isLoading) return <Loading />;
    if (isError && getErrorStatus(error) === 404) return <NoAccount />;
    if (isError && getErrorStatus(error) === 401) return <InvalidToken />;
    if (isError && getErrorStatus(error) === 400)
      return <TokenExpired token={token} />;
    return <VerifiedAccount data={data as RegisterUserApiResponse} />;
  };

  return (
    <Container
      width="min(500px, 95%)"
      border="0.5px solid"
      borderColor="var(--primary-700)"
      padding="24px 16px"
      margin="2rem auto"
      alignSelf="center"
      boxShadow="var(--box-shadow)"
      gap="16px"
    >
      {renderComponent()}
    </Container>
  );
};

export default Verify;
