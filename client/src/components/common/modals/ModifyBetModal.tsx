import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal } from "../../../reducers/modalReducer";

export const ModifyBetModal = () => {
  const dispatch = useAppDispatch();
  const { betId } = useAppSelector((state) => state.modal);

  console.log("BETID", betId);

  return (
    <div className="modal-container">
      Modify Bet Modal
      <button onClick={() => dispatch(closeModal())}>Close</button>
    </div>
  );
};
