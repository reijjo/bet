import { BetInputProps } from "../../utils/types";
import { Checkbox } from "../index";

export const FreeLiveInput = ({
  handleBetInput,
  myBet,
}: // setMyBet,
// modifyIndex,
// addParlay,
BetInputProps) => (
  <div className="add-bet-checks">
    <div className="freebet-check">
      <Checkbox
        className="my-checkbox"
        id="freebet"
        name="freebet"
        checked={myBet.betDetails[0].freebet}
        onChange={handleBetInput}
        label="Freebet"
        value={myBet.betDetails[0].freebet}
        // disabled={
        //   myBet && myBet.length > 0 && modifyIndex === null && !addParlay
        // }
      />
    </div>
    <div className="livebet-check">
      <Checkbox
        className="my-checkbox"
        id="livebet"
        name="livebet"
        checked={myBet.betDetails[0].livebet}
        onChange={handleBetInput}
        label="Livebet"
        value={myBet.betDetails[0].livebet}
        // disabled={
        //   myBet && myBet.length > 0 && modifyIndex === null && !addParlay
        // }
      />
    </div>
  </div>
);
