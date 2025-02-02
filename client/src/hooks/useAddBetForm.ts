import { ChangeEvent, useState } from "react";

import { getInputValue } from "../pages/add-bet/betUtils";
import {
  initialBetDetailValues,
  initialBetValues,
} from "../utils/defaults/defaults";
import { scrollToTop } from "../utils/helperFunctions";
import { validateBetDetailsInputs } from "../utils/inputValidators";
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
    invalidDetailsInput(name, value);
  };

  const handleDetailsSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setAddBetDetails((bet) => ({
      ...bet,
      [e.target.name]: value,
    }));
  };

  const handleModifyBet = (index: number) => {
    setModifyIndex(index);
    scrollToTop();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("focus:", name, value);
    invalidDetailsInput(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Shows input errors on the go
  const invalidDetailsInput = (name: string, value: string | number) => {
    const validation = validateBetDetailsInputs({
      ...addBetDetails,
      [name]: value,
    });
    console.log("validation:", validation);

    if (!validation.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validation.errors[name] || "",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  return {
    addBetDetails,
    setAddBetDetails,
    errors,
    setErrors,
    handleBetInput,
    handleDetailsSelect,
    modifyIndex,
    setModifyIndex,
    handleModifyBet,
    myBet,
    setMyBet,
    handleFocus,
    handleBlur,
  };
};
