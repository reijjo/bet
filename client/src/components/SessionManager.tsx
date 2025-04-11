import { useCallback, useEffect, useRef } from "react";

import { logoutUser } from "../features/authSlice";
import {
  confirmModalOpen,
  refreshModalOpen,
  resetModal,
} from "../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

export const SessionManager = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state: RootState) => state.modal.isRefreshModalOpen,
  );
  // Add this line to check auth state
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startSessionTimer = useCallback(() => {
    if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
    if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);

    sessionTimeoutRef.current = setTimeout(() => {
      dispatch(confirmModalOpen(true));
      dispatch(refreshModalOpen(true));

      logoutTimeoutRef.current = setTimeout(() => {
        dispatch(logoutUser());
        dispatch(resetModal());
      }, 50 * 1000);
    }, 60 * 1000);
  }, [dispatch]);

  // Only start the timer if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User authenticated - starting session timer");
      startSessionTimer();
    } else {
      // Clear timers if user is not authenticated
      console.log("User not authenticated - clearing session timers");
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
        sessionTimeoutRef.current = null;
      }
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
        logoutTimeoutRef.current = null;
      }
      // Make sure modal is closed when logged out
      if (isModalOpen) {
        dispatch(resetModal());
      }
    }

    return () => {
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
      if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
    };
  }, [isAuthenticated, startSessionTimer, dispatch, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen && logoutTimeoutRef.current) {
      console.log("Modal closed - cancelling logout timer");
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = null;

      // Restart session timer
      startSessionTimer();
    }
  }, [isModalOpen, startSessionTimer]);

  return null;
};
