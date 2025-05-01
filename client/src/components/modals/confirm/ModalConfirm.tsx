import "./ModalConfirm.css";

import { useEffect, useState } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Divider } from "../../";

type ModalConfirmProps = {
  handleCancel: () => void;
  handleConfirm: () => void;
  header?: string;
  text?: string;
  theButton?: string;
  cancelButton?: string;
  showTimer?: boolean;
  timerDuration?: number;
  disabled?: boolean;
};

export const ModalConfirm = ({
  header = "Delete bet?",
  text = "The bet is gone forever.",
  theButton = "Delete",
  cancelButton = "Cancel",
  handleCancel,
  handleConfirm,
  showTimer = false,
  timerDuration = 600,
  disabled,
}: ModalConfirmProps) => {
  const [secondsLeft, setSecondsLeft] = useState(timerDuration);

  useEffect(() => {
    // Reset timer when modal opens
    if (showTimer) {
      setSecondsLeft(timerDuration);

      // Set up the timer
      const timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(timer);
            // When timer reaches zero, trigger cancel action (logout)
            handleCancel();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      // Clean up interval on unmount
      return () => clearInterval(timer);
    }
  }, [showTimer, timerDuration, handleCancel]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="modal-confirm-overlay">
      <div className="modal-confirm">
        <div className="header">
          <p>{header}</p>
          <button onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <Divider color="var(--primary-800)" />
        <div className="text-div">
          {text}
          {showTimer && (
            <div className="timer">
              Logging out in {formatTime(secondsLeft)}...
            </div>
          )}
        </div>
        {/* <Divider /> */}
        <div className="buttons">
          <button
            className="btn btn-outline"
            type="button"
            onClick={handleConfirm}
            disabled={disabled}
          >
            {theButton}
          </button>
          <button
            className="btn btn-delete"
            type="button"
            onClick={handleCancel}
            disabled={disabled}
          >
            {cancelButton}
          </button>
        </div>
      </div>
    </div>
  );
};
