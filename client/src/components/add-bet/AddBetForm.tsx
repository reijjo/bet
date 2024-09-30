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
import { getInputValue } from "./betUtils";
// import { initialBetValues } from "./betUtils";

type AddBetFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  addParlay: boolean;
  setAddParlay: Dispatch<React.SetStateAction<boolean>>;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
};

export const AddBetForm = ({
  myBet,
  setMyBet,
  modifyIndex,
  addParlay,
  setAddParlay,
  setModifyIndex,
}: AddBetFormProps) => {
  // Handles all types of bet inputs
  const handleBetInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const inputValue = getInputValue(type, checked, value);
    setMyBet((prev) => ({
      ...prev,
      betDetails: [
        {
          ...prev.betDetails[0],
          [name]: inputValue,
        },
      ],
    }));
  };

  const handleMyBet = (e: SyntheticEvent) => {
    e.preventDefault();
    // if (modifyIndex !== null) {
    //   const updatedBets = [...myBet];
    //   // updatedBets[modifyIndex] = newBet;
    //   setMyBet(updatedBets);
    //   setModifyIndex(null);
    // } else {
    //   // setMyBet([...myBet, newBet]);
    // }
    // // setNewBet(initialBetValues);
    // setAddParlay(false);
    console.log("myBet", myBet);

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleCancel = () => {
    console.log("clear form");
    // setNewBet(initialBetValues);
    setModifyIndex(null);
    setAddParlay(false);

    // Scrolls down if there is a bet in your slip
    {
      // addParlay && myBet.length > 0;
      // setTimeout(() => {
      //   window.scrollTo({
      //     top: document.body.scrollHeight,
      //     behavior: "smooth",
      //   });
      // }, 100);
    }
  };

  return (
    <div className="addbet-container">
      <h3 className="container-header">Add Bet</h3>
      <form className="addbet-form" onSubmit={handleMyBet}>
        <MatchInput
          handleBetInput={handleBetInput}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <DateInput
          handleBetInput={handleBetInput}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <FreeLiveInput
          handleBetInput={handleBetInput}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <SelectionInput
          handleBetInput={handleBetInput}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <OddsInput
          handleBetInput={handleBetInput}
          myBet={myBet}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
        />
        <NotesInput
          handleBetInput={handleBetInput}
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
            // disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
          />
          <Button
            children="Cancel"
            type="button"
            className="btn outline-btn"
            style={{ fontSize: "1.25em" }}
            onClick={handleCancel}
            // disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
          />
        </div>
      </form>
    </div>
  );
};
