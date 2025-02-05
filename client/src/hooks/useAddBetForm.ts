import { ChangeEvent, useState } from "react";

// import { Result } from "../components/modals/modify-bet/ModifyBetSlip";
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

    // Clear field-specific error when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];

      // Special handling for team fields
      if (name === "home_team" || name === "away_team") {
        delete newErrors.match;
        delete newErrors.home_team;
        delete newErrors.away_team;
      }

      return newErrors;
    });

    // Only validate after user has entered something
    if (inputValue) {
      const validation = validateBetDetailsInputs({
        ...addBetDetails,
        [name]: inputValue,
      });

      if (!validation.isValid && validation.errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validation.errors[name],
        }));
      }
    }
  };

  const handleDetailsSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setAddBetDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error when a selection is made
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  // const spyResultChange = (bet: BetDetails, result: Result) => {
  //   // Only update if we have both bet and result data
  //   if (!bet || !result) return false;

  //   const betId = Number(bet.id);
  //   const resultData = result[betId];

  //   // Check if there are any differences between bet and result
  //   const hasChanges =
  //     bet.home_result !== resultData?.home_result ||
  //     bet.away_result !== resultData?.away_result ||
  //     JSON.stringify(bet.betbuilder_result) !==
  //       JSON.stringify(resultData?.betbuilder_result);

  //   if (hasChanges) {
  //     // If there are changes, update the bet with the new results
  //     return {
  //       ...bet,
  //       home_result: resultData?.home_result || bet.home_result,
  //       away_result: resultData?.away_result || bet.away_result,
  //       betbuilder_result:
  //         resultData?.betbuilder_result || bet.betbuilder_result,
  //     };
  //   }

  //   return false;
  // };

  const handleModifyBet = (index: number) => {
    setModifyIndex(index);
    scrollToTop();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    // Only clear errors on focus, don't validate
    if (name === "home_team" || name === "away_team") {
      clearTeamErrors();
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validate on blur only if there's a value
    if (value) {
      const validation = validateBetDetailsInputs({
        ...addBetDetails,
        [name]: value,
      });

      if (!validation.isValid && validation.errors[name]) {
        if (name === "betbuilder_selection") return;

        setErrors((prev) => ({
          ...prev,
          [name]: validation.errors[name],
        }));
      }
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
