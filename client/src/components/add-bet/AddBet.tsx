import { useState } from "react";

import { useAddBetForm } from "../../hooks/useAddBetForm";
import { scrollToTop } from "../../utils/helperFunctions";
import { Bet } from "../../utils/types";
import { AddBetForm } from "../index";
import { AddStakeForm } from "./add-stake-form/AddStakeForm";
import { initialBetValues } from "./betUtils";

export const AddBet = () => {
  const [myBet, setMyBet] = useState<Bet>(initialBetValues);
  // const [modifyIndex, setModifyIndex] = useState<number | null>(null);
  const { modifyIndex, setModifyIndex } = useAddBetForm();

  const handleModifyBet = (index: number) => {
    console.log("INDEEEEXXXX", index);
    setModifyIndex(index);
    scrollToTop();
  };

  console.log("myBet", myBet);

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
        <AddStakeForm
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
