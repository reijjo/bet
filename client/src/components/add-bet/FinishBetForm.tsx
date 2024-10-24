import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { TextInput, Select, FinishBetButtons } from "../index";
import { BetType, Bookmaker } from "../../utils/enums";
import { Bet } from "../../utils/types";
import { useAppDispatch } from "../../store/hooks";
import { addNewBet } from "../../reducers/betReducer";
import { initialBetValues } from "./betUtils";
import { useNavigate } from "react-router-dom";

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

  const addBet = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(addNewBet(myBet));
    setMyBet(initialBetValues);
    navigate("/dash");
    console.log("BET READY!!", myBet);
  };

  return (
    <form className="finishbet-form" onSubmit={addBet}>
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
          disabled={addStake || modifyIndex !== null}
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
          disabled={addStake || modifyIndex !== null}
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
          disabled={addStake || modifyIndex !== null}
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
          disabled={addStake || modifyIndex !== null}
        />
      </div>
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
