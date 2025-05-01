import { useEffect, useRef } from "react";

// import { useLogoutMutation } from "../features/api/authApi";
// import { logoutUser } from "../features/authSlice";
import {
  confirmModalOpen,
  refreshModalOpen, // resetModal,
} from "../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { SHOW_LOGOUT_MODAL } from "../utils/defaults/defaults";

export const SessionManager = () => {
  // const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  // const { isRefreshModalOpen: isModalOpen } = useAppSelector(
  //   (state: RootState) => state.modal,
  // );
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // const handleLogout = useCallback(async () => {
  //   try {
  //     await logout().unwrap();
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   } finally {
  //     dispatch(resetModal());
  //     dispatch(logoutUser());
  //   }
  // }, [logout, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      sessionTimeoutRef.current = setTimeout(() => {
        dispatch(confirmModalOpen(true));
        dispatch(refreshModalOpen(true));
      }, SHOW_LOGOUT_MODAL);
    }

    return () => {
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
        sessionTimeoutRef.current = null;
      }
    };
  }, [isAuthenticated, dispatch]);

  return null;
};
