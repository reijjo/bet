import { useAppDispatch } from "../../../store/hooks";
import { closeModal } from "../../../slices/modalSlice";

export const AddBetModal = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="modal-container">
      Moi oon modal
      <button onClick={() => dispatch(closeModal())}>sulje</button>
    </div>
  );
};
