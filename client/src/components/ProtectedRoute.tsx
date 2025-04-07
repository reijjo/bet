import { useEffect } from "react";

import { Navigate } from "react-router-dom";

import {
  useGetSessionUserQuery,
  useLogoutMutation,
} from "../features/api/authApi";
import { logoutUser } from "../features/authSlice";
import { useAppSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { RootState } from "../store/store";
import { Loading } from "./common/fallback/Loading";
import { AppLayout } from "./layout/AppLayout";

// import { UserLayout } from "./layout/UserLayout";

export const ProtectedRoute = () => {
  const { data, isLoading, isError, error } = useGetSessionUserQuery();
  const [logout] = useLogoutMutation();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && isError) {
      console.log("session validation error", error);
      handleLogout();
    }
  });

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(logoutUser());
    }
  };

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

  const isSessionValid = data?.success && data?.data;
  if (!isSessionValid && !isAuthenticated) {
    console.log("isSessionValid", isSessionValid);
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
};
