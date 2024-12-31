import "./ModifyBet.css";

type ModifyBetMatchProps = {
  bet: {
    home_team: string;
    away_team: string;
  };
};

export const ModifyBetMatch = ({ bet }: ModifyBetMatchProps) => (
  <div className="modifybet-slip-match">
    <p className="modifybet-slip-hometeam">{bet.home_team}</p>
    <p className="modifybet-slip-awayteam">{bet.away_team}</p>
  </div>
);
