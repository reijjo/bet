import { getInputValue } from "@utils/betUtils";
import {
  BetDetails,
  initialBetDetailValues,
  validateBetDetailsInputs,
} from "@utils";
import { useState, ChangeEvent, FocusEvent } from "react";

export const useAddBetDetails = () => {
  const [addBetDetails, setAddBetDetails] = useState<BetDetails>(
    initialBetDetailValues
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = "checked" in e.target ? e.target.checked : false;
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

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    handleFocus,
    handleBlur,
  };
};
