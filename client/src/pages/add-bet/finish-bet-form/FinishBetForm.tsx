import "./FinishBetForm.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { BookmakerInput, NotesInput, SportInput, TipperInput } from "..";
import { useAddNewBetMutation } from "../../../features/api/betsApiSlice";
import { useBetCalculations } from "../../../hooks/useBetCalculations";
import { useAppSelector } from "../../../store/hooks";
import { initialBetValues } from "../../../utils/defaults/defaults";
import { Bookmaker } from "../../../utils/enums";
import { scrollToTop } from "../../../utils/helperFunctions";
import { Bet } from "../../../utils/types";
import { FinishBetButtons } from "../FinishBetButtons";
import { getFinalBetType } from "../betUtils";

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

  const { finalOdds } = useBetCalculations();

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!myBet.tipper && user?.username) {
      setMyBet((prev) => ({ ...prev, tipper: user.username as string }));
    }
  }, [myBet.tipper, user, setMyBet]);

  // TODO: Move the handlers to useAddBetForm hook and combine the handlers there
  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setMyBet((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e) {
      console.log("No event object received");
      return;
    }
    if (!e.target) {
      console.log("No event target");
      return;
    }

    const value = e.target.value;

    setMyBet((prevBet) => {
      console.log("Previous bet:", prevBet);
      const newBet = {
        ...prevBet,
        [e.target.name]: value,
      };
      console.log("New bet:", newBet);
      return newBet;
    });
  };

  console.log("user", user);

  // Adds new bet to the list of bets
  const addBet = async (e: SyntheticEvent) => {
    e.preventDefault();

    const finalType = getFinalBetType(myBet.betDetails);
    // TODO: ID comes from the backend and userId from logged user
    const betToSave = {
      ...myBet,
      bet_final_type: finalType,
      bet_final_odds: finalOdds(myBet.betDetails),
      user_id: user?.id,
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
        value={myBet.tipper ?? user?.username}
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
        isLoading={isLoading}
      />
    </form>
  );
};
