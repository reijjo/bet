import "./ModalConfirm.css";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Divider } from "../../divider/Divider";

type ModalConfirmProps = {
  handleCancel: () => void;
  handleConfirm: () => void;
  header?: string;
  text?: string;
  theButton?: string;
};

export const ModalConfirm = ({
  header = "Delete bet?",
  text = "The bet is gone forever.",
  theButton = "Delete",
  handleCancel,
  handleConfirm,
}: ModalConfirmProps) => {
  return (
    <div className="modal-confirm-overlay">
      <div className="modal-confirm">
        <div className="header">
          <p>{header}</p>
          <button onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <Divider color="var(--primary-800)" />
        <div className="text-div">{text}</div>
        <Divider />
        <div className="buttons">
          <button
            className="btn btn-outline"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-delete"
            type="button"
            onClick={handleConfirm}
          >
            {theButton}
          </button>
        </div>
      </div>
    </div>
  );
};
