import "./FinishBetForm.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

// import { v4 as uuidv4 } from "uuid";
import { BookmakerInput, NotesInput, SportInput, TipperInput } from "..";
import { useAddNewBetMutation } from "../../../features/api/betsApiSlice";
import { Bookmaker } from "../../../utils/enums";
import { scrollToTop } from "../../../utils/helperFunctions";
import { Bet } from "../../../utils/types";
import { FinishBetButtons } from "../../index";
import { getFinalBetType, initialBetValues } from "../betUtils";

type FinishBetFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
};

export const FinishBetForm = ({
  myBet,
  setMyBet,
  modifyIndex,
  setModifyIndex,
}: FinishBetFormProps) => {
  const [addStake, setAddStake] = useState(false);
  const [addNewBet, { isLoading }] = useAddNewBetMutation();

  const navigate = useNavigate();

  // TODO: Move the handlers to useAddBetForm hook and combine the handlers there
  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setMyBet((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMyBet((myBet) => ({
      ...myBet,
      [e.target.name]: e.target.value,
    }));
  };

  // Adds new bet to the list of bets
  const addBet = async (e: SyntheticEvent) => {
    e.preventDefault();

    const finalType = getFinalBetType(myBet.betDetails);
    // TODO: ID comes from the backend and userId from logged user
    const betToSave = {
      ...myBet,
      bet_final_type: finalType,
      // id: uuidv4(),
      user_id: 1,
    };

    try {
      await addNewBet(betToSave).unwrap();
      setMyBet(initialBetValues);
      scrollToTop();
      navigate("/bets");
    } catch (error: unknown) {
      console.error("Failes to add new bet", error);
    }
  };

  // TODO: SportInput as a dataset?? Where you can add a sport / league that isnt in the list aka SPORTS/LEAGUE comes from backend
  // TODO2: Tipper default value username

  return (
    <form className="finishbet-form" onSubmit={addBet}>
      <SportInput
        onChange={handleSelectChange}
        value={myBet.sport}
        disabled={addStake || modifyIndex !== null || isLoading}
      />
      <BookmakerInput
        onChange={handleSelectChange}
        value={myBet.bookmaker ?? Bookmaker.Unibet}
        disabled={addStake || modifyIndex !== null || isLoading}
      />
      <TipperInput
        onChange={handleTextInput}
        value={myBet.tipper}
        disabled={addStake || modifyIndex !== null || isLoading}
      />
      <NotesInput
        onChange={handleTextInput}
        value={myBet.notes ?? ""}
        disabled={addStake || modifyIndex !== null || isLoading}
      />
      <FinishBetButtons
        myBet={myBet}
        setMyBet={setMyBet}
        addStake={addStake}
        setAddStake={setAddStake}
        modifyIndex={modifyIndex}
        setModifyIndex={setModifyIndex}
      />
    </form>
  );
};
