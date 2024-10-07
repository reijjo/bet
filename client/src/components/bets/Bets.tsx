import "./Bets.css";
import { useAppSelector } from "../../store/hooks";
import dayjs from "dayjs";

export const Bets = () => {
  const allbets = useAppSelector((state) => state.bets.allBets);
  const latestBets = allbets.slice(-2).reverse();

  console.log("allbets", allbets);

  return (
    <div className="wrapper">
      <h1>Bets</h1>
      <div className="bets-grid">
        <div className="bets-grid-headers">
          <p className="bets-grid-date">Date</p>
          <p className="bets-grid-sport">Sport</p>
          <p className="bets-grid-match">Match</p>
          <p className="bets-grid-selection">Selection</p>
          <p className="bets-grid-type">Type</p>
          <p className="bets-grid-stake">Stake</p>
          <p className="bets-grid-odds">Odds</p>
          <p className="bets-grid-status">Status</p>
          <p className="bets-grid-winloss">Win</p>
        </div>
        {latestBets.map((bet) => (
          <div className="bets-grid-betslips">
            <p className="bets-grid-date">
              {dayjs(bet.betDetails[0].date).format("D MMM")}
            </p>
            <p className="bets-grid-sport">{bet.sport}</p>
            <div className="bets-grid-match">
              <p>Match</p>
            </div>
            <div className="bets-parlay-div">
              {bet.betDetails.map((parlay, index) => (
                <p key={index} className="bets-grid-selection">
                  {parlay.selection}
                </p>
              ))}
            </div>
            <div className="bets-grid-type">
              <p className="bets-grid-type">{bet.bet_type}</p>
            </div>
            <p className="bets-grid-stake">{Number(bet.stake).toFixed(2)}</p>
            <div className="bets-parlay-div">
              {bet.betDetails.map((parlay, index) => (
                <p key={index} className="bets-grid-odds">
                  {parlay.odds}
                </p>
              ))}
            </div>
            <div className="bets-grid-status">
              <p>Status</p>
            </div>
            <div className="bets-grid-winloss">
              <p>&euro;</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bets-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Sport</th>
              <th>Match</th>
              <th>Selection</th>
              <th>Type</th>
              <th>Stake</th>
              <th>Odds</th>
              <th>Status</th>
              <th>Win / Loss</th>
            </tr>
          </thead>
          <tbody>
            {allbets.map((bet) => (
              <tr>
                <td className="table-date">
                  {" "}
                  <p>{dayjs(bet.betDetails[0].date).format("D MMM")}</p>
                </td>
                <td className="table-sport">{bet.sport}</td>
                <td className="table-match">{bet.betDetails[0].home_team}</td>
                <td className="table-selection">
                  {bet.betDetails[0].selection}
                </td>
                <td className="table-type">{bet.bet_type}</td>
                <td className="table-stake">{Number(bet.stake).toFixed(2)}</td>
                <td className="table-odds">{bet.betDetails[0].odds}</td>
                <td className="table-status">{bet.status}</td>
                <td className="table-winloss">10 &euro;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
