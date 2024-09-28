import "./AddBet.css";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox, Select, TextArea, TextInput } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Bet } from "../../utils/types";
import { BetType, BetStatus, Bookmaker, SportLeague } from "../../utils/enums";
import { MyBetSlip } from "./MyBetSlip";

export const AddBet = () => {
  const [myBet, setMyBet] = useState<Bet[]>([]);
  const [newBet, setNewBet] = useState<Bet>({
    home_team: "",
    away_team: "",
    selection: "",
    sport: SportLeague.None,
    status: BetStatus.Pending,
    bet_type: BetType.Single || "",
    odds: "",
    stake: 0,
    date: new Date().toISOString().split("T")[0],
    bookmaker: Bookmaker.Bet365,
    tipper: "",
    freebet: false,
    livebet: false,
    notes: "",
    result: "",
  });

  const [moreFields, setMoreFields] = useState(false);
  const [modifyIndex, setModifyIndex] = useState<number | null>(null);
  const [addParlay, setAddParlay] = useState(false);

  const handleMoreFields = () => {
    setMoreFields(!moreFields);
  };

  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setNewBet((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewBet((newBet) => {
      return {
        ...newBet,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleNewBet = (e: SyntheticEvent) => {
    e.preventDefault();
    if (modifyIndex !== null) {
      const updatedBets = [...myBet];
      updatedBets[modifyIndex] = newBet;
      setMyBet(updatedBets);
      setModifyIndex(null);
    } else {
      setMyBet([...myBet, newBet]);
    }

    setNewBet({
      home_team: "",
      away_team: "",
      selection: "",
      sport: SportLeague.None,
      status: BetStatus.Pending,
      bet_type: BetType.Single,
      odds: "",
      stake: 0,
      date: new Date().toISOString().split("T")[0],
      bookmaker: Bookmaker.Other,
      tipper: "",
      freebet: false,
      livebet: false,
      notes: "",
      result: "",
    });

    setAddParlay(false);

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleModifyBet = (index: number) => {
    setNewBet(myBet[index]);
    setModifyIndex(index);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleCancel = () => {
    console.log("clear form");
    setNewBet({
      home_team: "",
      away_team: "",
      selection: "",
      sport: SportLeague.None,
      status: BetStatus.Pending,
      bet_type: BetType.Single,
      odds: "",
      stake: 0,
      date: new Date().toISOString().split("T")[0],
      bookmaker: Bookmaker.Other,
      tipper: "",
      freebet: false,
      livebet: false,
      notes: "",
      result: "",
    });
    setModifyIndex(null);
    setAddParlay(false);
  };

  const handleAddToParley = () => {
    handleCancel();
    setAddParlay(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  console.log("myBet", myBet);
  console.log("modifyIndex", modifyIndex);
  console.log("add parlay", addParlay);

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
                value={newBet.home_team}
                disabled={
                  myBet.length > 0 && modifyIndex === null && !addParlay
                }
              />

              <p className="match-dash">-</p>
              <TextInput
                type="text"
                placeholder="Away Team"
                id="away_team"
                name="away_team"
                size={20}
                onChange={handleTextInput}
                value={newBet.away_team}
                disabled={
                  myBet.length > 0 && modifyIndex === null && !addParlay
                }
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
              onChange={handleTextInput}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
              value={newBet.sport}
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
              onChange={handleTextInput}
              value={newBet.selection}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            />
          </div>
          <div className="bet-type-input">
            <Select
              id="bet_type"
              name="bet_type"
              label="Bet Type"
              className="text-input"
              options={Object.values(BetType)}
              onChange={handleSelectChange}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
              value={newBet.bet_type}
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
              onChange={handleTextInput}
              value={newBet.odds}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
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
                  disabled={
                    myBet.length > 0 && modifyIndex === null && !addParlay
                  }
                  onChange={handleTextInput}
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
                  options={Object.values(Bookmaker)}
                  value={newBet.bookmaker}
                  disabled={
                    myBet.length > 0 && modifyIndex === null && !addParlay
                  }
                  onChange={handleSelectChange}
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
                  value={newBet.tipper}
                  disabled={
                    myBet.length > 0 && modifyIndex === null && !addParlay
                  }
                  onChange={handleTextInput}
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
                  value={newBet.notes}
                  disabled={
                    myBet.length > 0 && modifyIndex === null && !addParlay
                  }
                  onChange={handleTextInput}
                />
              </div>
              <div className="add-bet-checks">
                <div className="freebet-check">
                  <Checkbox
                    className="my-checkbox"
                    id="freebet"
                    name="freebet"
                    checked={newBet.freebet}
                    onChange={() =>
                      setNewBet((prev) => ({ ...prev, freebet: !prev.freebet }))
                    }
                    label="Freebet"
                    value={newBet.freebet}
                    disabled={
                      myBet.length > 0 && modifyIndex === null && !addParlay
                    }
                  />
                </div>
                <div className="livebet-check">
                  <Checkbox
                    className="my-checkbox"
                    id="livebet"
                    name="livebet"
                    checked={newBet.livebet}
                    onChange={() =>
                      setNewBet((prev) => ({ ...prev, livebet: !prev.livebet }))
                    }
                    label="Livebet"
                    value={newBet.livebet}
                    disabled={
                      myBet.length > 0 && modifyIndex === null && !addParlay
                    }
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
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            />
            <Button
              children="Cancel"
              type="button"
              className="btn outline-btn"
              style={{ fontSize: "1.25em" }}
              onClick={handleCancel}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            />
          </div>
        </form>
      </div>
      {myBet.length > 0 && (
        <MyBetSlip
          myBet={myBet}
          setMyBet={setMyBet}
          handleModifyBet={handleModifyBet}
          handleAddToParley={handleAddToParley}
        />
      )}
    </div>
  );
};
