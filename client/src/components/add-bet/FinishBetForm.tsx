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

type FinishBetFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
};

export const FinishBetForm = ({ myBet, setMyBet }: FinishBetFormProps) => {
  const [addStake, setAddStake] = useState(false);

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

    // setMyBet([...myBet, newBet]);
    // setMyBet((details) => ({
    //   ...details,
    //   sport: newBet.sport,
    // }));

    console.log("myBet", myBet);
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
          size={20}
          onChange={handleTextInput}
          value={myBet.sport}
          disabled={addStake}
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
          disabled={addStake}
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
          disabled={addStake}
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
          size={15}
          onChange={handleTextInput}
          value={myBet.tipper}
          disabled={addStake}
        />
      </div>
      <FinishBetButtons
        myBet={myBet}
        setMyBet={setMyBet}
        addStake={addStake}
        setAddStake={setAddStake}
      />
    </form>
  );
};
