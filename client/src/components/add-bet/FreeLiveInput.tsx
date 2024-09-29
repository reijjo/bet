import { InputProps } from "../../utils/types";
import { Checkbox } from "../index";

export const FreeLiveInput = ({
  newBet,
  setNewBet,
  myBet,
  modifyIndex,
  addParlay,
}: InputProps) => (
  <div className="add-bet-checks">
    <div className="freebet-check">
      <Checkbox
        className="my-checkbox"
        id="freebet"
        name="freebet"
        checked={newBet.betDetails.freebet}
        onChange={() =>
          setNewBet &&
          setNewBet((prev) => ({
            ...prev,
            betDetails: {
              ...prev.betDetails,
              freebet: !prev.betDetails.freebet,
            },
          }))
        }
        label="Freebet"
        value={newBet.betDetails.freebet}
        disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
      />
    </div>
    <div className="livebet-check">
      <Checkbox
        className="my-checkbox"
        id="livebet"
        name="livebet"
        checked={newBet.betDetails.livebet}
        onChange={() =>
          setNewBet &&
          setNewBet((prev) => ({
            ...prev,
            betDetails: {
              ...prev.betDetails,
              livebet: !prev.betDetails.livebet,
            },
          }))
        }
        label="Livebet"
        value={newBet.betDetails.livebet}
        disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
      />
    </div>
  </div>
);
