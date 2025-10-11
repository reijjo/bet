import "./FinishBetForm.css";

import { Dispatch, SetStateAction, SyntheticEvent } from "react";

import { useNavigate } from "react-router-dom";

import { useAddNewBetMutation } from "@features/api/betsApiSlice";
import { useBetCalculations } from "@hooks/useBetCalculations";
import { useAppSelector } from "@store/hooks";
import { initialBetValues } from "@utils/defaults/defaults";
import { scrollToTop } from "@utils/helperFunctions";
import { Bet } from "@utils/types";
import {
  FinishBetButtons,
  FinishBetInputs,
} from "@features/add-bet/components/forms";
import { getFinalBetType } from "@utils/betUtils";
import { useFinishBet } from "@features/add-bet/hooks/useFinishBet";
import { BetType } from "@/utils";

type FinishBetFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyId: number | null;
  setModifyId: Dispatch<React.SetStateAction<number | null>>;
};

export const FinishBetForm = ({
  myBet,
  setMyBet,
  modifyId,
  setModifyId,
}: FinishBetFormProps) => {
  const [addNewBet, { isLoading }] = useAddNewBetMutation();

  const { addStake, setAddStake, handleTextInput, handleSelectChange } =
    useFinishBet(setMyBet);
  const { finalOdds } = useBetCalculations();

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  // Adds new bet to the list of bets
  const addBet = async (e: SyntheticEvent) => {
    e.preventDefault();

    const finalType = getFinalBetType(myBet.betDetails);

    const cleanedBetDetails = myBet.betDetails.map((detail) => {
      const { id, ...cleanDetail } = detail;
      void id; // Ignore the id
      return cleanDetail;
    });

    const betToSave = {
      ...myBet,
      betDetails: cleanedBetDetails,
      bet_final_type: finalType,
      bet_final_odds: finalOdds(myBet.betDetails),
      user_id: user?.id,
      sport: myBet.sport ? myBet.sport : BetType.Other,
    };

    try {
      await addNewBet(betToSave).unwrap();
      setMyBet(initialBetValues);
      scrollToTop();
      navigate("/bets");
    } catch (error: unknown) {
      console.error("Failed to add new bet", error);
    }
  };

  // TODO: SportInput as a dataset?? Where you can add a sport / league that isnt in the list aka SPORTS/LEAGUE comes from backend

  return (
    <form className="finishbet-form" onSubmit={addBet}>
      <FinishBetInputs
        myBet={myBet}
        setMyBet={setMyBet}
        addStake={addStake}
        modifyId={modifyId}
        handleSelectChange={handleSelectChange}
        handleTextInput={handleTextInput}
        user={user}
        isLoading={isLoading}
      />
      <FinishBetButtons
        myBet={myBet}
        setMyBet={setMyBet}
        addStake={addStake}
        setAddStake={setAddStake}
        modifyId={modifyId}
        setModifyId={setModifyId}
        isLoading={isLoading}
      />
    </form>
  );
};
