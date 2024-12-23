import "./FreeLiveInput.css";

import { BetInputProps } from "../../../../utils/types";
import { Checkbox } from "../../../index";

interface FreeLiveInputProps extends BetInputProps {
  gridRow?: string;
  gridColumn?: string;
}

export const FreeLiveInput = ({
  handleBetInput,
  details,
  disabled,
  gridRow,
  gridColumn,
}: FreeLiveInputProps) => (
  <div
    className="add-bet-checks"
    style={{ gridRow: gridRow, gridColumn: gridColumn }}
  >
    <div className="freebet-check">
      <Checkbox
        className="my-checkbox"
        id="freebet"
        name="freebet"
        checked={details.freebet}
        onChange={handleBetInput}
        label="Freebet"
        value={details.freebet}
        disabled={disabled}
      />
    </div>
    <div className="livebet-check">
      <Checkbox
        className="my-checkbox"
        id="livebet"
        name="livebet"
        checked={details.livebet}
        onChange={handleBetInput}
        label="Livebet"
        value={details.livebet}
        disabled={disabled}
      />
    </div>
  </div>
);
