import "./AddBetModal.css";

import { useAppDispatch } from "../../../store/hooks";
import { closeModal } from "../../../slices/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

export const AddBetModal = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="modal-container">
      <div className="add-bet-close">
        <a onClick={() => dispatch(closeModal())} title="Close">
          <FontAwesomeIcon icon={faXmark} />
        </a>
      </div>
      <div className="add-bet-finish">
        <div className="finish-bet-header">
          <h3>Add Stake</h3>
        </div>
        <div className="finish-mybet">
          <div className="finish-mybet-slip-headers">
            {/* <div className="finish-mybet-date">date</div> */}
            <div className="finish-mybet-match">match</div>
            <div className="finish-mybet-selection">selection</div>
            <div className="finish-mybet-stake">stake</div>
            <div className="finish-mybet-odds">odds</div>
            <div className="finish-my-bet-potential">potential win</div>
            <div className="finish-mybet-more" style={{ visibility: "hidden" }}>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div className="finish-mybet-slip">
            {/* <div className="finish-mybet-slip-date">date</div> */}
            <div className="finish-mybet-slip-match">match</div>
            <div className="finish-mybet-slip-selection">selection</div>
            <div className="finish-mybet-slip-stake">stake</div>
            <div className="finish-mybet-slip-odds">odds</div>
            <div className="finish-mybet-slip-potential">potential</div>
            <div className="finish-mybet-slip-more">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
        </div>
        <div className="finish-bet-buttons">
          <Button
            type="button"
            onClick={() => console.log("jee")}
            className="btn"
            children="Add Stake"
          />
          <Button
            type="button"
            onClick={() => console.log("jee")}
            className="btn btn-outlined"
            children="Add to parley"
          />
        </div>
      </div>
    </div>
  );
};
