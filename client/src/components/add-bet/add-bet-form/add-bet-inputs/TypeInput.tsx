import "./TypeInput.css";

import { ChangeEvent } from "react";

import { LimitedBetType } from "../../../../utils/enums";
import { BetDetails } from "../../../../utils/types";
import { Select } from "../../../common/inputs/Select";

type TypeInputProps = {
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  details: BetDetails;
  disabled?: boolean;
};

export const TypeInput = ({
  handleSelectChange,
  details,
  disabled,
}: TypeInputProps) => {
  return (
    <div className="bet-type-input">
      <Select
        id="bet_type"
        name="bet_type"
        label="Bet Type"
        className="text-input"
        options={Object.values(LimitedBetType)}
        onChange={handleSelectChange}
        value={details.bet_type}
        height="2.4rem"
        disabled={disabled}
      />
    </div>
  );
};
