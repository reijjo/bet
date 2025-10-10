import "./ModifyBetModal.css";

import { useEffect, useState } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetBetByIdQuery } from "@features/api/betsApiSlice";
import { resetModal } from "@features/modalSlice";
import { useAddBetForm } from "@features/add-bet/hooks/useAddBetForm";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { initialBetValues } from "@utils/defaults/defaults";
import { Bet } from "@utils/types";
import { Error } from "@components/common/fallback/Error";
import { Loading } from "@components/shared/fallback/loading/Loading";
import { ModifyBetDetailsForm } from "./ModifyBetDetailsForm";
import { ModifyBetSlip } from "./modify-betslip/ModifyBetSlip";

export const ModifyBetModal = () => {
  const [myBet, setMyBet] = useState<Bet>(initialBetValues);

  const { id } = useAppSelector((state) => state.modal.isModifyBetModalOpen);
  const { modifyId, setModifyId, handleModifyBet } = useAddBetForm();
  const {
    data: fetchedBet,
    isLoading,
    isError,
    error,
  } = useGetBetByIdQuery(Number(id), {
    // skip: !id,
  });

  console.log("fetchBet", fetchedBet);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fetchedBet) {
      setMyBet(fetchedBet);
    }
  }, [fetchedBet]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching bet", error);
      dispatch(resetModal());
    }
  }, [isError, error, dispatch]);

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
      {modifyId !== null && (
        <ModifyBetDetailsForm
          setMyBet={setMyBet}
          modifyId={modifyId}
          setModifyId={setModifyId}
          disabled={myBet.betDetails.length > 0 && modifyId === null}
        />
      )}
      {myBet.betDetails.length > 0 && modifyId === null && (
        <ModifyBetSlip
          myBet={myBet}
          setMyBet={setMyBet}
          handleModifyBet={handleModifyBet}
        />
      )}
    </div>
  );
};
