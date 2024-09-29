import { ChangeEvent, Dispatch, SyntheticEvent } from "react";
import { TextInput, Select, FinishBetButtons } from "../index";
import { BetType, Bookmaker } from "../../utils/enums";
import { Bet } from "../../utils/types";

type FinishBetFormProps = {
  newBet: Bet;
  setNewBet: Dispatch<React.SetStateAction<Bet>>;
  myBet: Bet[];
  setMyBet: Dispatch<React.SetStateAction<Bet[]>>;
  handleAddToParlay: () => void;
  addParlay: boolean;
};

export const FinishBetForm = ({
  newBet,
  setNewBet,
  myBet,
  setMyBet,
  handleAddToParlay,
  addParlay,
}: FinishBetFormProps) => {
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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewBet((newBet) => {
      return {
        ...newBet,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addBet = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("newBet", newBet);
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
          // disabled={myBet.length > 0 && modifyIndex === null}
          value={newBet.sport}
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
          // disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
          value={newBet.bet_type}
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
          value={newBet.bookmaker}
          // disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
          onChange={handleSelectChange}
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
          value={newBet.tipper}
          // disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
          onChange={handleTextInput}
        />
      </div>
      <FinishBetButtons
        myBet={myBet}
        setMyBet={setMyBet}
        handleAddToParley={handleAddToParlay}
        addParlay={addParlay}
      />
    </form>
  );
};
