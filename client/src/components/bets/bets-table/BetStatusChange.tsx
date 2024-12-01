import "./BetStatusChange.css";

import { useEffect, useRef, useState } from "react";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { changeBetStatus } from "../../../reducers/betReducer";
import { useAppDispatch } from "../../../store/hooks";
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
  } else if (value === "Push" || value === "Void") {
    return "bet-status-void";
  } else {
    return "bet-status-pending";
  }
};

export const BetStatusChange = ({ bet }: BetStatusChangeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeStatus = (newStatus: BetStatus) => {
    const updatedBet = { ...bet, status: newStatus };
    dispatch(changeBetStatus(updatedBet));
    setIsOpen(false);
  };

  const options = Object.values(BetStatus).filter((op) => op !== bet.status);

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
                onClick={() => changeStatus(op)}
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
