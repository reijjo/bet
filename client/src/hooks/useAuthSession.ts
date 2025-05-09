import { useCallback } from "react";

import {
  useLazyGetSessionUserQuery,
  useLogoutMutation,
  useRefreshSessionMutation,
} from "../features/api/authApi";
import { loginUser, logoutUser } from "../features/authSlice";
import { resetModal } from "../features/modalSlice";
import { useAppDispatch } from "../store/hooks";

export const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const [fetchSession] = useLazyGetSessionUserQuery();
  const [logout, { isLoading }] = useLogoutMutation();
  const [refreshSession, { isLoading: isRefreshing, isError: isRefreshError }] =
    useRefreshSessionMutation();

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(resetModal());
      dispatch(logoutUser());
    }
  }, [dispatch, logout]);

  const verifySession = useCallback(async () => {
    try {
      const result = await fetchSession().unwrap();
      if (result?.success && result?.data) {
        dispatch(loginUser(result.data));
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error("Session check error:", err);
      handleLogout();
    }
  }, [handleLogout, dispatch, fetchSession]);

  const handleRefresh = useCallback(async () => {
    try {
      const result = await fetchSession().unwrap();
      if (result?.success && result?.data) {
        dispatch(loginUser(result.data));
        await refreshSession().unwrap();
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error("Session refresh error:", err);
      handleLogout();
    }
  }, [handleLogout, dispatch, fetchSession, refreshSession]);

  return {
    isLoading,
    isRefreshing,
    isRefreshError,
    verifySession,
    handleRefresh,
    handleLogout,
  };
};
