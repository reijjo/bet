import { ChangeEvent, useState } from "react";

import {
  getInputValue,
  initialBetDetailValues,
} from "../components/add-bet/betUtils";
import { scrollToTop } from "../utils/helperFunctions";
import { BetDetails } from "../utils/types";

export const useAddBetForm = () => {
  const [addBetDetails, setAddBetDetails] = useState<BetDetails>(
    initialBetDetailValues,
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modifyIndex, setModifyIndex] = useState<number | null>(null); // REMOVE THIS??

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

  // RENMOVE THIS ??
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
  };
};