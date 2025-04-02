import { Navigate } from "react-router-dom";

import { useGetSessionUserQuery } from "../features/api/authApi";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { Loading } from "./common/fallback/Loading";
import { UserLayout } from "./layout/UserLayout";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading, isSuccess } = useGetSessionUserQuery();

  // const rootstate = useAppSelector((state: RootState) => state);
  console.log(
    "ProtectedRoute - isLoading:",
    isLoading,
    "isAuthenticated",
    isAuthenticated,
    "data",
    data,
  );

  if (isLoading) {
    return <Loading />;
  }

  const isSessionValid = isSuccess && data?.success && data?.data;

  if (!isSessionValid && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <UserLayout />;
};
