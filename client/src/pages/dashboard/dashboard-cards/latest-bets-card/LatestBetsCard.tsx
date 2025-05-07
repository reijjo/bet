import "./LatestBetsCard.css";

import dayjs from "dayjs";

import { isModifyBetModalOpen } from "../../../../features/modalSlice";
import { useAppDispatch } from "../../../../store/hooks";
import { allBetsProp } from "../../../../utils/types";
import { calculateCombinedOdds } from "../summaryUtils";
import { BetStatus } from "./BetStatus";
import { LatestMatch } from "./LatestMatch";
import { LatestSelections } from "./LatestSelections";

const LatestHeaders = () => (
  <div className="latest-headers">
    <p className="latest-bet-header-date">Date</p>
    <p className="latest-bet-header-match">Match</p>
    <p className="latest-bet-header-selection">Selection</p>
    <p className="latest-bet-header-stake">Stake</p>
    <p className="latest-bet-header-odds">Odds</p>
    <p className="latest-bet-header-status">Status</p>
  </div>
);

const LatestBets = ({ allBets }: allBetsProp) => {
  const latestBets = allBets.slice(0, 3);
  const dispatch = useAppDispatch();

  const modifybet = (id: number | string) => {
    dispatch(isModifyBetModalOpen({ id, isOpen: true }));
  };

  if (allBets.length === 0) {
    return (
      <p
        style={{
          display: "grid",
          placeContent: "center",
          gridRow: "3 / span 4",
          padding: "1rem",
        }}
      >
        No settled bets yet.
      </p>
    );
  }

  return (
    <>
      {latestBets.map((bet) => {
        return (
          <a
            className="latest-bets"
            key={bet.id}
            onClick={() => modifybet(String(bet.id))}
          >
            <p className="latest-bet-data-date">
              {dayjs(bet.betDetails[0].date).format("D MMM")}
            </p>
            <LatestMatch details={bet.betDetails} />
            <LatestSelections details={bet.betDetails} />
            <p className="bet-stake">{Number(bet.stake).toFixed(2)} &euro;</p>
            <p className="bet-odds">
              {calculateCombinedOdds(bet.betDetails).toFixed(2)}
            </p>
            <BetStatus bet={bet} />
          </a>
        );
      })}
    </>
  );
};

export const LatestBetsCard = ({ allBets }: allBetsProp) => {
  return (
    <div className="dash-latestbets">
      <h5>Latest bets</h5>
      <LatestHeaders />
      <LatestBets allBets={allBets} />
    </div>
  );
};
