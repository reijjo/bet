import "./TypeInput.css";

import { ChangeEvent } from "react";

import { Select } from "../../../../components/common/inputs/Select";
import { LimitedBetType } from "../../../../utils/enums";
import { BetDetails } from "../../../../utils/types";

type TypeInputProps = {
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  details: BetDetails;
  disabled?: boolean;
  gridRow?: string;
  gridColumn?: string;
};

export const TypeInput = ({
  handleSelectChange,
  details,
  disabled,
  gridColumn,
  gridRow,
}: TypeInputProps) => (
  <div
    className="bet-type-input"
    style={{ gridColumn: gridColumn, gridRow: gridRow }}
  >
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
