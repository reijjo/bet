import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { closeModal } from "../../../../reducers/modalReducer";
import { useEffect, useState } from "react";
import { Bet } from "../../../../utils/types";
import { initialBetValues } from "../../../add-bet/betUtils";
import { betApi } from "../../../../api/betApi";
import { ModifyBetForm } from "./ModifyBetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModifyBetSlip } from "./ModifyBetSlip";

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
      <div className="mybet-header">
        <h3 className="container-header">Modify Bet</h3>
        <div className="mybets-close">
          <a onClick={() => dispatch(closeModal())} title="Close">
            <FontAwesomeIcon icon={faXmark} />
          </a>
        </div>
      </div>
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
        <ModifyBetSlip
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
