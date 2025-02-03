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

  const clearTeamErrors = () => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.home_team;
      delete newErrors.away_team;
      delete newErrors.match;
      return newErrors;
    });
  };

  console.log('ERRORS"', errors);

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

    if (name === "home_team" || name === "away_team") {
      clearTeamErrors();
    }

    const validation = validateBetDetailsInputs({
      ...addBetDetails,
      [name]: inputValue,
    });

    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        ...validation.errors,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        if (name === "home_team" || name === "away_team") {
          delete newErrors.match;
          delete newErrors.home_team;
          delete newErrors.away_team;
        }
        return newErrors;
      });
    }
  };

  const handleDetailsSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setAddBetDetails((bet) => ({
      ...bet,
      [name]: value,
    }));

    // return value;
  };

  const handleModifyBet = (index: number) => {
    setModifyIndex(index);
    scrollToTop();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log("FOCUS NAME", name);

    if (name === "home_team" || name === "away_team") {
      clearTeamErrors();
    }

    invalidDetailsInput(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === "home_team" || name === "away_team") {
      clearTeamErrors();
    }

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

    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        [name]: validation.errors[name] || "",
        // Clear match error if we're validating team inputs
        ...(name === "home_team" || name === "away_team"
          ? { matcherror: "" }
          : {}),
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];

        // Clear match error if we're validating team inputs
        if (name === "home_team" || name === "away_team") {
          delete newErrors.matcherror;
        }

        return newErrors;
      });
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
