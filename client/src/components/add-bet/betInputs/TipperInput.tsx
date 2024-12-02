import "./TipperInput.css";

import { BetInputProps } from "../../../utils/types";
import { TextInput } from "../../index";

export const TipperInput = ({ handleBetInput }: BetInputProps) => {
  return (
    <div className="tipper-input">
      <TextInput
        className="text-input"
        label="Tipper"
        optional="optional"
        type="text"
        id="tipper"
        name="tipper"
        onChange={handleBetInput}
        // value={myBet.tipper}
        // disabled={addStake || modifyIndex !== null}
      />
    </div>
  );
};
