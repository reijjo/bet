import { useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";

import {
  useGetSessionUserQuery,
  useLogoutMutation,
} from "@features/api/authApi";
import { loginUser, logoutUser } from "@features/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { RootState } from "@store/store";
import { getErrorStatus } from "@utils/errors/error-helpers";
import { Loading } from "./shared/fallback/loading/Loading";
import { AppLayout } from "./shared/index";

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
  const [logout] = useLogoutMutation();

  const errorStatus = getErrorStatus(error);

  useEffect(() => {
    console.log("checking sesion");
    const loggingOut = async () => {
      await logout().unwrap();
      dispatch(logoutUser());
    };

    if (!isLoading) {
      if (isError || errorStatus === 401) {
        console.log("Logging out due to error or 401");
        loggingOut();
      } else if (sessionData?.success && sessionData?.data) {
        console.log("Logging in with session data");
        dispatch(loginUser(sessionData.data));
      }
    }
  }, [sessionData, isLoading, isError, errorStatus, dispatch, logout]);

  if (isLoading) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        <Loading text="Loading user..." color="white" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppLayout />;
};
