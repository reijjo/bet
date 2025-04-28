import "./FinishModify.css";

import { useEffect, useRef, useState } from "react";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BetStatus } from "../../../utils/enums";
import { Bet } from "../../../utils/types";

interface StatusChangeProps {
  bet: Bet;
  setMyBet: React.Dispatch<React.SetStateAction<Bet>>;
}

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

export const StatusChange = ({ bet, setMyBet }: StatusChangeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [updateBet, { isLoading, isError, error }] = useEditBetMutation();

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
    console.log("NEWSTATUS", newStatus);
    setMyBet({ ...bet, status: newStatus });
    setIsOpen(false);
  };

  // Filters the current bet status from the options
  const options = Object.values(BetStatus).filter((op) => op !== bet.status);

  // Returns
  return (
    <div
      className="bet-status-change modify-change"
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
    >
      <a className="status-with-ball" onClick={() => setIsOpen(!isOpen)}>
        <div
          className={`bet-status-ball ${endedBetBallColor(bet.status)}`}
        ></div>
        <div className="bet-status-change-value-modify">
          <p>{bet.status}</p>
          {isOpen ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </div>
      </a>
      {isOpen && (
        <div className="bet-status-change-options-modify">
          {options.map((op) => (
            <a
              key={op}
              className="bet-status-options-list-modify status-with-ball-modify"
              onClick={() => changeStatus(op)}
            >
              <div className={`bet-status-ball ${endedBetBallColor(op)}`}></div>
              <p>{op}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
