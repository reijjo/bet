import { Navigate } from "react-router-dom";

import { useGetSessionUserQuery } from "../features/api/authApi";
import { logoutUser } from "../features/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { Loading } from "./common/fallback/Loading";
import { AppLayout } from "./layout/AppLayout";

// import { UserLayout } from "./layout/UserLayout";

export const ProtectedRoute = () => {
  const { data, isLoading, isSuccess } = useGetSessionUserQuery();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

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

  console.log("isSessionValid", isSessionValid);

  if (!isSessionValid && !isAuthenticated) {
    dispatch(logoutUser());
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
};
