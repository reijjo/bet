import { useEffect, useState } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetBetByIdQuery } from "../../../../features/api/betsApiSlice";
import { resetModal } from "../../../../features/modalSlice";
import { useAddBetForm } from "../../../../hooks/useAddBetForm";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { Bet } from "../../../../utils/types";
import { initialBetValues } from "../../../add-bet/betUtils";
import { Error } from "../../fallback/Error";
import { Loading } from "../../fallback/Loading";
import { ModifyBetDetailsForm } from "./ModifyBetDetailsForm";
import { ModifyBetSlip } from "./ModifyBetSlip";

export const ModifyBetModal = () => {
  const [myBet, setMyBet] = useState<Bet>(initialBetValues);

  const { id } = useAppSelector((state) => state.modal.isModifyBetModalOpen);
  const { modifyIndex, setModifyIndex, handleModifyBet } = useAddBetForm();
  const {
    data: fetchedBet,
    isLoading,
    isError,
    error,
  } = useGetBetByIdQuery(String(id));

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("IM IN MODIFYBETMODAL COMPONENT");
    if (fetchedBet) {
      setMyBet(fetchedBet);
    }
  }, [fetchedBet]);

  // Returns
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  return (
    <div className="modal-container">
      <div className="mybet-header">
        <h3 className="container-header">Modify Bet</h3>
        <div className="mybets-close">
          <a onClick={() => dispatch(resetModal())} title="Close">
            <FontAwesomeIcon icon={faXmark} />
          </a>
        </div>
      </div>
      {modifyIndex !== null && (
        <ModifyBetDetailsForm
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
        />
      )}
    </div>
  );
};
