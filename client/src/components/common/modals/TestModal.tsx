import { useAppDispatch } from "../../../store/hooks";
import { closeModal } from "../../../slices/modalSlice";

export const TestModal = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="modal-container">
      OOON MODLLLAAA
      <button onClick={() => dispatch(closeModal())}>sulje</button>
    </div>
  );
};
