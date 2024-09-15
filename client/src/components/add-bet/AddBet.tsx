import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox, Select, TextArea, TextInput } from "../index";
import "./AddBet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const AddBet = () => {
  const [moreFields, setMoreFields] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [liveBet, setLiveBet] = useState(false);

  console.log("date", date);

  const handleMoreFields = () => {
    setMoreFields(!moreFields);
    console.log("moreFields", moreFields);
  };

  const handleLiveBet = () => {
    setLiveBet(!liveBet);
    console.log("liveBet", liveBet);
  };

  return (
    <div className="wrapper">
      <div className="addbet-container">
        <h3 className="container-header">Add Bet</h3>
        <form className="addbet-form">
          <div className="match-input">
            <div
              style={{
                paddingLeft: "4px",
                fontSize: "0.925em",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <p>Match</p>
              <p className="text-input-paragraph">(optional)</p>
            </div>
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
              optional="optional"
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
              id="selection"
              name="selection"
              size={20}
            />
          </div>
          <div className="bet-type-input">
            <TextInput
              className="text-input"
              label="Bet type"
              optional="optional"
              type="text"
              placeholder="Bet type"
              id="bet-type"
              name="bet-type"
              size={20}
            />
          </div>
          <div className="odds-input">
            <TextInput
              className="text-input"
              label="Odds"
              optional="decimal"
              type="text"
              placeholder="Odds"
              id="odds"
              name="odds"
              size={20}
            />
          </div>
          <div className="fields-dropdown" onClick={handleMoreFields}>
            {moreFields ? (
              <>
                <p>Less Fields</p>
                <FontAwesomeIcon icon={faCaretUp} />
              </>
            ) : (
              <>
                <p>More Fields</p>
                <FontAwesomeIcon icon={faCaretDown} />
              </>
            )}
          </div>
          {moreFields && (
            <>
              <div className="date-input">
                <TextInput
                  className="text-input"
                  label="Date"
                  optional="optional"
                  type="date"
                  id="date"
                  name="date"
                  size={20}
                  value={date}
                  defaultValue={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="bookmaker-input">
                <Select
                  className="text-input"
                  label="Bookmaker"
                  optional="optional"
                  id="bookmaker"
                  name="bookmaker"
                  size={1}
                  defaultValue="EpicBet"
                />
              </div>
              <div className="tipper-input">
                <TextInput
                  className="text-input"
                  label="Tipper"
                  optional="optional"
                  type="text"
                  id="tipper"
                  name="tipper"
                  size={20}
                  // value={date}
                  // defaultValue={date}
                  // onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="notes-input">
                <TextArea
                  className="text-input"
                  label="Notes"
                  optional="optional"
                  id="notes"
                  name="notes"
                  rows={3}
                  cols={1}
                  placeholder="Your own notes for the bet..."
                />
              </div>
              <div className="add-bet-checks">
                <div className="freebet-check">
                  <Checkbox
                    className="my-checkbox"
                    id="freebet"
                    name="freebet"
                    checked={false}
                    onChange={() => {}}
                    label="Freebet"
                  />
                </div>
                <div className="livebet-check">
                  <Checkbox
                    className="my-checkbox"
                    id="livebet"
                    name="livebet"
                    checked={liveBet}
                    onChange={handleLiveBet}
                    label="Livebet"
                  />
                </div>
              </div>
            </>
          )}
          <div
            className={`add-bet-buttons ${
              moreFields && "add-bet-buttons-extra-fields"
            } `}
          >
            <Button
              children="Continue"
              type="button"
              className="btn big-btn-style"
              style={{ fontSize: "1.25em" }}
            />
            <Button
              children="Cancel"
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
