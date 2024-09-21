import "./AddBet.css";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox, Select, TextArea, TextInput } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Bet } from "../../utils/types";
import { BetType, BetStatus, Bookmaker, SportLeague } from "../../utils/enums";
import { useAppDispatch } from "../../store/hooks";
import { openModal, addBetModal } from "../../slices/modalSlice";

export const AddBet = () => {
  const dispatch = useAppDispatch();

  const [myBet, setMyBet] = useState<Bet[]>([]);
  const [newBet, setNewBet] = useState<Bet>({
    home_team: "",
    away_team: "",
    selection: "",
    sport: SportLeague.None,
    status: BetStatus.Pending,
    bet_type: BetType.Single,
    odds: 0,
    stake: 0,
    date: new Date().toISOString().split("T")[0],
    bookmaker: Bookmaker.Other,
    tipper: "",
    freebet: false,
    livebet: false,
    notes: "",
    result: "",
  });

  const [moreFields, setMoreFields] = useState(false);
  const [liveBet, setLiveBet] = useState(false);

  const handleMoreFields = () => {
    setMoreFields(!moreFields);
    console.log("moreFields", moreFields);
  };

  const handleLiveBet = () => {
    setLiveBet(!liveBet);
    console.log("liveBet", liveBet);
  };

  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBet((newBet) => {
      return {
        ...newBet,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleNewBet = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("newBet", newBet);
    dispatch(openModal());
    dispatch(addBetModal(true));
  };

  return (
    <div className="wrapper">
      <div className="addbet-container">
        <h3 className="container-header">Add Bet</h3>
        <form className="addbet-form" onSubmit={handleNewBet}>
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
                id="home_team"
                name="home_team"
                size={20}
                onChange={handleTextInput}
              />
              <p className="match-dash">-</p>
              <TextInput
                type="text"
                placeholder="Away Team"
                id="away_team"
                name="away_team"
                size={20}
                onChange={handleTextInput}
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
                  value={newBet.date}
                  defaultValue={newBet.date}
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
                  placeholder="Your own notes about the bet..."
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
              type="submit"
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
