import { useEffect, useRef } from "react";

import {
  confirmModalOpen,
  refreshModalOpen, // resetModal,
} from "../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { SHOW_LOGOUT_MODAL } from "../utils/defaults/defaults";

export const SessionManager = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
