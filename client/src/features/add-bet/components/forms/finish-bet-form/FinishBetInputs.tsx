import { Bet, Bookmaker, User } from "@/utils";
import {
  SportInput,
  BookmakerInput,
  TipperInput,
  NotesInput,
} from "./finish-bet-inputs";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type FinishBetInputsProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  addStake: boolean;
  modifyId: number | null;
  isLoading?: boolean;
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void;
  user?: User | null;
};

export const FinishBetInputs = ({
  myBet,
  setMyBet,
  addStake,
  modifyId,
  isLoading,
  handleSelectChange,
  handleTextInput,
  user,
}: FinishBetInputsProps) => (
  <>
    <SportInput
      setMyBet={setMyBet}
      value={myBet.sport || ""}
      disabled={addStake || modifyId !== null || isLoading}
    />
    <BookmakerInput
      onChange={handleSelectChange}
      value={myBet.bookmaker ?? Bookmaker.Unibet}
      disabled={addStake || modifyId !== null || isLoading}
    />
    <TipperInput
      onChange={handleTextInput}
      value={myBet.tipper || user?.username || ""}
      disabled={addStake || modifyId !== null || isLoading}
    />
    <NotesInput
      onChange={handleTextInput}
      value={myBet.notes || ""}
      disabled={addStake || modifyId !== null || isLoading}
    />
  </>
);
