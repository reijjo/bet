import { Bet } from "@/utils";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export const useFinishBet = (setMyBet: Dispatch<SetStateAction<Bet>>) => {
  const [addStake, setAddStake] = useState(false);

  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) || 0 : value;

    setMyBet((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setMyBet((prevBet) => {
      const newBet = {
        ...prevBet,
        [e.target.name]: value,
      };
      return newBet;
    });
  };

  return {
    addStake,
    setAddStake,
    handleTextInput,
    handleSelectChange,
  };
};
