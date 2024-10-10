import { useAppDispatch } from "../../../store/hooks";
import { closeModal } from "../../../reducers/modalReducer";

export const ModifyBetModal = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="modal-container">
      Modify Bet Modal
      <button onClick={() => dispatch(closeModal())}>Close</button>
    </div>
  );
};
