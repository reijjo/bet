import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";
import {
  Button,
  MatchInput,
  DateInput,
  FreeLiveInput,
  SelectionInput,
  OddsInput,
  NotesInput,
} from "../index";
import { Bet } from "../../utils/types";
import { initialBetValues } from "./betUtils";

type AddBetFormProps = {
  // handleNewBet: (e: SyntheticEvent) => void;
  newBet: Bet;
  setNewBet: Dispatch<SetStateAction<Bet>>;
  myBet: Bet[];
  setMyBet: Dispatch<SetStateAction<Bet[]>>;
  modifyIndex: number | null;
  addParlay: boolean;
  setAddParlay: Dispatch<React.SetStateAction<boolean>>;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
};

export const AddBetForm = ({
  newBet,
  setNewBet,
  myBet,
  setMyBet,
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
    setNewBet(initialBetValues);
    setAddParlay(false);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
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
        <MatchInput
          handleTextInput={handleTextInput}
          newBet={newBet}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <DateInput
          handleTextInput={handleTextInput}
          newBet={newBet}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <FreeLiveInput
          newBet={newBet}
          setNewBet={setNewBet}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <SelectionInput
          handleTextInput={handleTextInput}
          newBet={newBet}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <OddsInput
          handleTextInput={handleTextInput}
          newBet={newBet}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <NotesInput
          handleTextInput={handleTextInput}
          newBet={newBet}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
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
