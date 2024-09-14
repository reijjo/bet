import { Button, TextInput } from "../index";
import "./AddBet.css";

export const AddBet = () => {
  return (
    <div className="wrapper">
      <div className="addbet-container">
        <h3 className="container-header">Add Bet</h3>
        <form className="addbet-form">
          <div className="match-input">
            <p style={{ paddingLeft: "4px", fontSize: "0.925em" }}>Match</p>
            <div className="match-input-fields">
              <TextInput
                type="text"
                placeholder="Home Team"
                id="home-team"
                name="home-team"
                size={20}
              />
              <p className="match-dash">-</p>
              <TextInput
                type="text"
                placeholder="Away Team"
                id="away-team"
                name="away-team"
                size={20}
              />
            </div>
          </div>
          <div className="sport-input">
            <TextInput
              className="text-input"
              label="Sport / League"
              type="text"
              placeholder="Sport / League"
              id="sport"
              name="sport"
              size={20}
            />
          </div>
          <div className="selection-input">
            <TextInput
              className="text-input"
              label="Selection"
              type="text"
              placeholder="Selection"
              id="bet-amount"
              name="bet-amount"
              size={20}
            />
          </div>
          <div className="bet-type-input">
            <TextInput
              className="text-input"
              label="Bet type"
              type="text"
              placeholder="Bet type"
              id="bet-amount"
              name="bet-amount"
              size={20}
            />
          </div>
          <div className="stake-input">
            <TextInput
              className="text-input"
              label="Stake"
              type="text"
              placeholder="Stake &euro;"
              id="bet-amount"
              name="bet-amount"
              size={20}
            />
          </div>
          <div className="add-bet-buttons">
            <Button
              children="Add Bet"
              type="button"
              className="btn big-btn-style"
              style={{ fontSize: "1.25em" }}
            />
            <Button
              children="Add Bet To Parley"
              type="button"
              className="btn outline-btn"
              style={{ fontSize: "1.25em" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
