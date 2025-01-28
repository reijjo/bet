import { ChangeEvent, useState } from "react";

import { getInputValue } from "../pages/add-bet/betUtils";
import { initialBetDetailValues, initialBetValues } from "../utils/defaults";
import { scrollToTop } from "../utils/helperFunctions";
import { Bet, BetDetails } from "../utils/types";

export const useAddBetForm = () => {
  const [myBet, setMyBet] = useState<Bet>(initialBetValues);
  const [addBetDetails, setAddBetDetails] = useState<BetDetails>(
    initialBetDetailValues,
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modifyIndex, setModifyIndex] = useState<number | null>(null);

  // Handles all types of bet inputs
  const handleBetInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const inputValue = getInputValue(type, checked, value);
    setAddBetDetails((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAddBetDetails((bet) => ({
      ...bet,
      [e.target.name]: e.target.value,
    }));
  };

  const handleModifyBet = (index: number) => {
    setModifyIndex(index);
    scrollToTop();
  };

  return {
    addBetDetails,
    setAddBetDetails,
    errors,
    setErrors,
    handleBetInput,
    handleSelectChange,
    modifyIndex,
    setModifyIndex,
    handleModifyBet,
    myBet,
    setMyBet,
  };
};
