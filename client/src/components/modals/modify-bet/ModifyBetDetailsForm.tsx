import "./ModifyBetDetailsForm.css";

import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import { Button, Error, Loading } from "../../";
import {
  useEditDetailsMutation,
  useGetDetailByIdQuery,
} from "../../../features/api/detailsApiSlice";
import { useAddBetForm } from "../../../hooks/useAddBetForm";
import { useScreenWidth } from "../../../hooks/useScreenWidth";
import {
  BetbuilderInput,
  DateInput,
  FreeLiveInput,
  MatchInput,
  OddsInput,
  SelectionInput,
  TypeInput,
} from "../../../pages/add-bet";
import { isBetBuilderType } from "../../../pages/add-bet/betUtils";
import { validateBetDetailsInputs } from "../../../utils/input-validators/inputValidators";
import { Bet } from "../../../utils/types";

type ModifyBetFormProps = {
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
  disabled: boolean;
};

export const ModifyBetDetailsForm = ({
  modifyIndex,
  setModifyIndex,
  disabled,
}: ModifyBetFormProps) => {
  const {
    handleBetInput,
    handleDetailsSelect,
    addBetDetails,
    setAddBetDetails,
    handleBlur,
    handleFocus,
  } = useAddBetForm();
  const {
    data: detailData,
    isLoading,
    isError,
    error,
  } = useGetDetailByIdQuery(modifyIndex as number, {
    skip: modifyIndex === null,
  });
  const [
    updateDetails,
    { isLoading: isUpdating, isError: isUpdateError, error: updateError },
  ] = useEditDetailsMutation();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (modifyIndex !== null && detailData) {
      setAddBetDetails(detailData);
    }
  }, [modifyIndex, detailData, setAddBetDetails]);

  const { isTablet, isMobile } = useScreenWidth();

  const handleCancel = () => {
    setModifyIndex(null);
  };

  // Updates the bet details
  const handleMyBet = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Validate fields before submitting
    const validation = validateBetDetailsInputs(addBetDetails);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (modifyIndex !== null) {
      try {
        const updated = await updateDetails(addBetDetails).unwrap();
        setErrors({});
        handleCancel();
        setAddBetDetails(updated);
      } catch (error: unknown) {
        console.log("Error updating bet", error);
      }
    }
  };

  // Returns
  if (isLoading) return <Loading />;
  if (isUpdateError) return <Error error={updateError} />;
  if (isError) return <Error error={error} />;

  return (
    <div className="modifybetform-container">
      <form
        className="addbet-form"
        data-testid="modify-bet-form"
        onSubmit={handleMyBet}
        style={isTablet ? { gridTemplateColumns: "repeat(2, 1fr)" } : {}}
      >
        <MatchInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
          gridColumn={isTablet || isMobile ? "1 / -1" : "1 / 3"}
          gridRow="1 / 2"
          handleBlur={handleBlur}
          handleFocus={handleFocus}
        />
        <DateInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
          gridRow="2 / 3"
          gridColumn={isTablet || isMobile ? "1 / 2" : "4 / 5"}
        />
        <FreeLiveInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
          gridColumn={isTablet || isMobile ? "2 / 3" : "4 / 5"}
          gridRow={isTablet || isMobile ? "2 / 3" : "1 / 2"}
        />
        {isBetBuilderType(addBetDetails?.bet_type) ? (
          <BetbuilderInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            disabled={disabled}
            error={errors}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            gridColumn={isTablet || isMobile ? "1 / -1" : "1 / 3"}
            gridRow={isTablet || isMobile ? "4 / 5" : "2 / 4"}
          />
        ) : (
          <SelectionInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            disabled={disabled}
            error={errors}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            gridColumn={isTablet || isMobile ? "1 / -1" : "1 / 3"}
            gridRow={isTablet || isMobile ? "3 / 4" : "2 / 4"}
          />
        )}
        <OddsInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
          error={errors}
          setError={setErrors}
          gridColumn={isTablet || isMobile ? "1 / 2" : "3 / 4"}
          gridRow={isTablet || isMobile ? "3 / 4" : "2 / 3"}
        />
        <TypeInput
          handleSelectChange={handleDetailsSelect}
          details={addBetDetails}
          disabled={disabled}
          gridColumn={isTablet || isMobile ? "2 / 3" : ""}
          gridRow={isTablet || isMobile ? "3 / 4" : "1 / 2"}
        />

        <div
          className="add-bet-buttons"
          style={isTablet || isMobile ? { gridColumn: "1 / -1" } : {}}
        >
          <Button
            children={isUpdating ? "Saving..." : "Save"}
            type="submit"
            className="btn btn-filled"
            disabled={disabled}
          />
          <Button
            children="Cancel"
            type="button"
            className="btn btn-outline"
            onClick={handleCancel}
            disabled={disabled}
          />
        </div>
      </form>
    </div>
  );
};
