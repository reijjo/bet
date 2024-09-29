import { ChangeEvent, Dispatch, SyntheticEvent } from "react";
import { TextInput, Checkbox, TextArea, Button } from "../index";
import { Bet } from "../../utils/types";
import { initialBetValues } from "./betUtils";

type AddBetFormProps = {
  handleNewBet: (e: SyntheticEvent) => void;
  newBet: Bet;
  setNewBet: Dispatch<React.SetStateAction<Bet>>;
  myBet: Bet[];
  modifyIndex: number | null;
  addParlay: boolean;
  setAddParlay: Dispatch<React.SetStateAction<boolean>>;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
};

export const AddBetForm = ({
  handleNewBet,
  newBet,
  setNewBet,
  myBet,
  modifyIndex,
  addParlay,
  setAddParlay,
  setModifyIndex,
}: AddBetFormProps) => {
  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setNewBet((prev) => ({
      ...prev,
      betDetails: {
        ...prev.betDetails,
        [name]: type === "number" ? parseFloat(value) : value,
      },
    }));
  };

  const handleCancel = () => {
    console.log("clear form");
    setNewBet(initialBetValues);
    setModifyIndex(null);
    setAddParlay(false);

    // Scrolls down if there is a bet in your slip
    {
      addParlay && myBet.length > 0;
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
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
              size={15}
              onChange={handleTextInput}
              value={newBet.betDetails.home_team}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            />
            <p className="match-dash">-</p>
            <TextInput
              type="text"
              placeholder="Away Team"
              id="away_team"
              name="away_team"
              size={15}
              onChange={handleTextInput}
              value={newBet.betDetails.away_team}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            />
          </div>
        </div>
        <div className="date-input">
          <TextInput
            className="text-input"
            label="Date"
            type="date"
            id="date"
            name="date"
            size={20}
            value={newBet.betDetails.date}
            disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            onChange={handleTextInput}
          />
        </div>
        <div className="add-bet-checks">
          <div className="freebet-check">
            <Checkbox
              className="my-checkbox"
              id="freebet"
              name="freebet"
              checked={newBet.betDetails.freebet}
              onChange={() =>
                setNewBet((prev) => ({
                  ...prev,
                  betDetails: {
                    ...prev.betDetails,
                    freebet: !prev.betDetails.freebet,
                  },
                }))
              }
              label="Freebet"
              value={newBet.betDetails.freebet}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            />
          </div>
          <div className="livebet-check">
            <Checkbox
              className="my-checkbox"
              id="livebet"
              name="livebet"
              checked={newBet.betDetails.livebet}
              onChange={() =>
                setNewBet((prev) => ({
                  ...prev,
                  betDetails: {
                    ...prev.betDetails,
                    livebet: !prev.betDetails.livebet,
                  },
                }))
              }
              label="Livebet"
              value={newBet.betDetails.livebet}
              disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            />
          </div>
        </div>
        <div className="selection-input">
          <TextInput
            className="text-input"
            label="Selection"
            type="text"
            placeholder="Selection"
            id="selection"
            name="selection"
            size={15}
            onChange={handleTextInput}
            value={newBet.betDetails.selection}
            disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
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
            size={15}
            onChange={handleTextInput}
            value={newBet.betDetails.odds}
            disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
          />
        </div>
        <div className="notes-input">
          <TextArea
            className="text-input"
            label="Notes"
            optional="optional"
            id="notes"
            name="notes"
            rows={2}
            cols={1}
            placeholder="Your own notes about the bet..."
            value={newBet.betDetails.notes}
            disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
            onChange={handleTextInput}
          />
        </div>
        <div className={`add-bet-buttons`}>
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
  );
};
