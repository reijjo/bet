import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import { BetType, Bookmaker } from "../../../../utils/enums";
import { Bet } from "../../../../utils/types";
import { initialBetValues } from "../../../add-bet/betUtils";
import { Select } from "../../inputs/Select";
import { TextInput } from "../../inputs/TextInput";
import { changeBetStatus } from "../../../../reducers/betReducer";
import { Button } from "../../Button";
import { Result } from "./ModifyBetSlip";
import { resetModal } from "../../../../reducers/modalReducer";

type FinishModifyProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
  result: Result;
};

export const FinishModify = ({
  myBet,
  setMyBet,
  result,
}: FinishModifyProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const finishBet = (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedBet = {
      ...myBet,
      betDetails: myBet.betDetails.map((bet, index) => ({
        ...bet,
        ...result[index],
      })),
    };

    dispatch(changeBetStatus(updatedBet));
    dispatch(resetModal());
    setMyBet(initialBetValues);
    navigate("/dash");
    console.log("BET READY!!", myBet);
  };

  return (
    <form className="finishbet-form" onSubmit={finishBet}>
      <div className="sport-input">
        <TextInput
          className="text-input"
          label="Sport / League"
          optional="optional"
          type="text"
          placeholder="Sport / League"
          id="sport"
          name="sport"
          size={10}
          onChange={handleTextInput}
          value={myBet.sport}
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
          value={myBet.bet_type}
        />
      </div>
      <div className="bookmaker-input">
        <Select
          className="text-input"
          label="Bookmaker"
          // optional="optional"
          id="bookmaker"
          name="bookmaker"
          size={1}
          options={Object.values(Bookmaker)}
          onChange={handleSelectChange}
          value={myBet.bookmaker}
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
          size={10}
          onChange={handleTextInput}
          value={myBet.tipper}
        />
      </div>
      <div className="finish-bet-buttons">
        <div className="flex-container">
          <Button
            type="submit"
            className="btn big-btn-style"
            children="Save Changes"
          />
          <Button
            type="button"
            className="btn outline-btn"
            children="Delete Bet"
          />
        </div>
      </div>
    </form>
  );
};
