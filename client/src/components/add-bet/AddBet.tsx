import "./AddBet.css";
import { AddBetForm } from "../index";
import { useState } from "react";
import { Bet } from "../../utils/types";
import { MyBetSlip } from "./MyBetSlip";
import { initialBetValues } from "./betUtils";

export const AddBet = () => {
  const [myBet, setMyBet] = useState<Bet>(initialBetValues);
  const [modifyIndex, setModifyIndex] = useState<number | null>(null);

  const handleModifyBet = (index: number) => {
    setModifyIndex(index);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="wrapper">
      <AddBetForm
        myBet={myBet}
        setMyBet={setMyBet}
        modifyIndex={modifyIndex}
        setModifyIndex={setModifyIndex}
        disabled={myBet.betDetails.length > 0 && modifyIndex === null}
      />
      {myBet.betDetails.length > 0 && (
        <MyBetSlip
          myBet={myBet}
          setMyBet={setMyBet}
          handleModifyBet={handleModifyBet}
          modifyIndex={modifyIndex}
          setModifyIndex={setModifyIndex}
        />
      )}
    </div>
  );
};
