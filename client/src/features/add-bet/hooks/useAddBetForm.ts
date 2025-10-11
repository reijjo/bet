import { useState } from "react";

import { initialBetValues } from "@/utils/defaults/defaults";
import { Bet } from "@utils/types";

export const useAddBetForm = () => {
  const [myBet, setMyBet] = useState<Bet>(initialBetValues);
  const [modifyId, setModifyId] = useState<number | null>(null);

  const handleModifyBet = (id: number) => {
    setModifyId(id);
  };

  return {
    modifyId,
    setModifyId,
    handleModifyBet,
    myBet,
    setMyBet,
  };
};
