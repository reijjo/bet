import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal } from "../../../reducers/modalReducer";
import { useEffect, useState } from "react";
import { Bet } from "../../../utils/types";
import { MyBetSlip } from "../../add-bet/MyBetSlip";
import { initialBetValues } from "../../add-bet/betUtils";
import { betApi } from "../../../api/betApi";
import { ModifyBetForm } from "./ModifyBetForm";

export const ModifyBetModal = () => {
  const [myBet, setMyBet] = useState<Bet>(initialBetValues);
  const [modifyIndex, setModifyIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const { betId } = useAppSelector((state) => state.modal);

  useEffect(() => {
    const fetchBet = async () => {
      try {
        const bet = await betApi.findBetById(betId);
        setMyBet(bet);
      } catch (error) {
        console.log("Error finding a bet", error);
      }
    };
    fetchBet();
  }, [betId]);

  const handleModifyBet = (index: number) => {
    setModifyIndex(index);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  console.log("BETID", betId);
  console.log("BETTT", myBet);

  return (
    <div className="modal-container">
      Modify Bet Modal
      <button onClick={() => dispatch(closeModal())}>Close</button>
      {modifyIndex !== null && (
        <ModifyBetForm
          myBet={myBet}
          setMyBet={setMyBet}
          modifyIndex={modifyIndex}
          setModifyIndex={setModifyIndex}
          disabled={myBet.betDetails.length > 0 && modifyIndex === null}
        />
      )}
      {myBet.betDetails.length > 0 && modifyIndex === null && (
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
