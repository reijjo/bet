import "./LatestBetsCard.css";

import dayjs from "dayjs";
import { Fragment } from "react/jsx-runtime";

import { isModifyBetModalOpen } from "../../../../features/modalSlice";
import { useAppDispatch } from "../../../../store/hooks";
import { allBetsProp } from "../../../../utils/types";
import { isBetBuilderType } from "../../../add-bet/betUtils";
import { calculateCombinedOdds } from "../summaryUtils";
import { BetStatus } from "./BetStatus";

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

  console.log("allBets", allBets);
  console.log("latgestBets", latestBets);

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
            <div className="bets-match">
              <div className="parlay-div">
                {bet.betDetails.map((parlay, index) => (
                  <p
                    className="bet-home-team"
                    key={index}
                    title={parlay.home_team}
                  >
                    {parlay.home_team}
                  </p>
                ))}
              </div>
              <div className="parlay-div">
                {bet.betDetails.map((_parlay, index) => (
                  <p className="bet-vs" key={index}>
                    -
                  </p>
                ))}
              </div>
              <div className="parlay-div">
                {bet.betDetails.map((parlay, index) => (
                  <p
                    className="bet-home-team"
                    key={index}
                    title={parlay.away_team}
                  >
                    {parlay.away_team}
                  </p>
                ))}
              </div>
            </div>
            <div className="parlay-div">
              {bet.betDetails.map((parlay, index) => (
                <Fragment key={index}>
                  {isBetBuilderType(parlay.bet_type) ? (
                    <div className="parlay-div">
                      {parlay.betbuilder_selection?.map((s, index) => (
                        <p key={index} title={s}>
                          {s}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="bet-selection" title={parlay.selection}>
                      {parlay.selection}
                    </p>
                  )}
                </Fragment>
              ))}
            </div>
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
