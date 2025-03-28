// import "../LoginRegister.css";

// import { useParams } from "react-router-dom";

// import { Container, Loading } from "../../../components";
// import {
//   useVerifyQuery,
// } from "../../../features/api/authApi";
// import { getErrorStatus } from "../../../utils/helperFunctions";
// import { NoAccount } from "./NoAccount";
// import { TokenExpired } from "./TokenExpired";
// import { VerifiedAccount } from "./VerifiedAccount";
// import { VerifyForm } from "./VerifyForm";

// export const Verify = () => {
//   const { token } = useParams();

//   const { data, isLoading, isError, error } = useVerifyQuery(token as string, {
//     skip: !token,
//   });

// const [
//   finishRegister,
//   {
//     data: finishData,
//     isLoading: isFinishing,
//     isError: isFinishError,
//     error: finishError,
//   },
// ] = useFinishRegisterMutation();

// const renderComponent = () => {
//   if (isLoading) return <Loading />;
//   if (isError && getErrorStatus(error) === 404) return <NoAccount />;
//   if (isError && getErrorStatus(error) === 400)
//     return <TokenExpired token={token} />;
//   if (finishData) return <VerifiedAccount data={finishData} />;
//   return (
//     <VerifyForm
//       data={data}
//       finishRegister={finishRegister}
//       isFinishing={isFinishing}
//       isFinishError={isFinishError}
//       finishError={finishError}
//     />
//   );
// };

// return (
//   <Container
//     width="min(500px, 95%)"
//     border="0.5px solid"
//     borderColor="var(--primary-700)"
//     padding="24px 16px"
//     margin="2rem auto"
//     alignSelf="center"
//     boxShadow="var(--box-shadow)"
//     gap="16px"
//   >
//     {renderComponent()}
//   </Container>
// );
// };
