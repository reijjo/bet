import "./HeadersBetsTable.css";

export const HeadersBetsTable = () => (
  <thead>
    <tr>
      <th className="table-header-date">Date</th>
      <th className="table-header-sport">Sport</th>
      <th className="table-header-type">Type</th>
      <th className="table-header-selection">Selection</th>
      <th className="table-header-result">Result</th>
      <th className="table-header-stake">Stake</th>
      <th className="table-header-odds">Odds</th>
      <th>Status</th>
      <th>Payout</th>
    </tr>
  </thead>
);
