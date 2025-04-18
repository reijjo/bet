import "./UnderCons.css";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import uc from "../../../assets/giphy.webp";
import { Button } from "../button/Button";

export const UnderCons = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="under-cons-component">
      <h2>Nothing here yet</h2>

      <img src={uc} alt="under-construction" width="240" height="180" />
      <p>Check back later...</p>
      <Button
        className="btn btn-outline under-cons-component-button"
        onClick={navigateBack}
        type="button"
        width="max-content"
        margin="1rem 0 0"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Go Back</p>
      </Button>
    </div>
  );
};
