import "./FinishBetForm.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { BookmakerInput, NotesInput, SportInput, TipperInput } from "..";
import { addNewBet } from "../../../reducers/betReducer";
import { useAppDispatch } from "../../../store/hooks";
import { Bookmaker } from "../../../utils/enums";
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const addBet = (e: SyntheticEvent) => {
    e.preventDefault();

    const finalType = getFinalBetType(myBet.betDetails);
    const updatedType = {
      ...myBet,
      bet_final_type: finalType,
    };

    dispatch(addNewBet(updatedType));
    setMyBet(initialBetValues);
    window.scrollTo({ top: 0 });
    navigate("/bets");
  };

  // TODO: SportInput as a dataset?? Where you can add a sport / league that isnt in the list aka SPORTS/LEAGUE comes from backend

  // TODO2: Tipper default value username

  console.log("myBet", myBet);
  console.log("typeee", getFinalBetType(myBet.betDetails));

  return (
    <form className="finishbet-form" onSubmit={addBet}>
      <SportInput
        onChange={handleSelectChange}
        value={myBet.sport}
        disabled={addStake || modifyIndex !== null}
      />
      <BookmakerInput
        onChange={handleSelectChange}
        value={myBet.bookmaker ?? Bookmaker.Other}
        disabled={addStake || modifyIndex !== null}
      />
      <TipperInput
        onChange={handleTextInput}
        value={myBet.tipper}
        disabled={addStake || modifyIndex !== null}
      />
      <NotesInput
        onChange={handleTextInput}
        value={myBet.notes ?? ""}
        disabled={addStake || modifyIndex !== null}
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
