import { useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useGetSessionUserQuery } from "../features/api/authApi";
import { loginUser, logoutUser } from "../features/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { getErrorStatus } from "../utils/helperFunctions";
import { Loading } from "./common/fallback/Loading";
import { AppLayout } from "./layout/AppLayout";

export const ProtectedRoute = () => {
  const {
    data: sessionData,
    isLoading,
    isError,
    error,
  } = useGetSessionUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const errorStatus = getErrorStatus(error);

  useEffect(() => {
    if (!isLoading) {
      // Check for error first
      if (isError || errorStatus === 401) {
        console.log("Logging out due to error or 401");
        dispatch(logoutUser());
      } else if (sessionData?.success && sessionData?.data) {
        console.log("Logging in with session data");
        dispatch(loginUser(sessionData.data));
      }
    }
  }, [sessionData, isLoading, isError, errorStatus, dispatch]);

  console.log("ProtectedRoute - data", sessionData);
  console.log("ProtectedRoute - isLoading", isLoading);
  console.log("ProtectedRoute - isError", isError);
  console.log("ProtectedRoute - error", error);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppLayout />;
};
