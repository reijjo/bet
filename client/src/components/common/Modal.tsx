import "./Modal.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { closeModal } from "../../slices/modalSlice";

export const Modal = () => {
  const modalOpen = useAppSelector((state: RootState) => state.modal.modalOpen);
  const dispatch = useAppDispatch();

  return (
    <div className="modal-base">
      <div className="modal-container">
        Moi oon modal
        <button onClick={() => dispatch(closeModal())}>sulje</button>
      </div>
    </div>
  );
};
