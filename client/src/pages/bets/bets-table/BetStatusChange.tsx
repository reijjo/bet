import "./BetStatusChange.css";

import { useEffect, useRef, useState } from "react";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Error } from "../../../components";
import { useEditBetMutation } from "../../../features/api/betsApiSlice";
import { logoutUser } from "../../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { BetStatus } from "../../../utils/enums";
import { Bet } from "../../../utils/types";

type BetStatusChangeProps = {
  bet: Bet;
};

const endedBetBallColor = (value: BetStatus) => {
  if (value === "Won" || value === "Half Won") {
    return "bet-status-won";
  } else if (value === "Lost" || value === "Half Lost") {
    return "bet-status-lost";
  } else if (value === "Void") {
    return "bet-status-void";
  } else {
    return "bet-status-pending";
  }
};

export const BetStatusChange = ({ bet }: BetStatusChangeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateBet, { isLoading, isError, error }] = useEditBetMutation();

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Closes the dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Listens for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Changes the status of the bet
  const changeStatus = async (newStatus: BetStatus) => {
    try {
      await updateBet({
        id: bet.id,
        user_id: user?.id,
        status: newStatus,
      }).unwrap();
    } catch (error: unknown) {
      console.log("Error changing bet status", error);
    }
    setIsOpen(false);
  };

  // Filters the current bet status from the options
  const options = Object.values(BetStatus).filter((op) => op !== bet.status);

  // Returns

  if (isError) {
    dispatch(logoutUser());
    return <Error error={error} />;
  }

  return (
    <td className="table-status">
      <div
        className="bet-status-change"
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
      >
        <a className="status-with-ball" onClick={() => setIsOpen(!isOpen)}>
          <div
            className={`bet-status-ball ${endedBetBallColor(bet.status)}`}
          ></div>
          <div className="bet-status-change-value">
            <p>{bet.status}</p>
            {isOpen ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </div>
        </a>
        {isOpen && (
          <div className="bet-status-change-options">
            {options.map((op) => (
              <a
                key={op}
                className="bet-status-options-list status-with-ball"
                onClick={() => !isLoading && changeStatus(op)}
                style={{
                  opacity: isLoading ? 0.5 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                <div
                  className={`bet-status-ball ${endedBetBallColor(op)}`}
                ></div>
                <p>{op}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </td>
  );
};
