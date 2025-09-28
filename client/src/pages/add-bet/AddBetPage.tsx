import "./AddBetPage.css";

import { useAddBetForm } from "../../hooks/useAddBetForm";
import { AddBetForm } from "../../features/add-bet/forms/add-bet-form/AddBetForm";
import { AddStakeForm } from "./add-stake-form/AddStakeForm";

const AddBetPage = () => {
  const { modifyIndex, setModifyIndex, handleModifyBet, myBet, setMyBet } =
    useAddBetForm();

  return (
    <div className="wrapper grid-row-2 addbet-page">
      <AddBetForm
        myBet={myBet}
        setMyBet={setMyBet}
        modifyIndex={modifyIndex}
        setModifyIndex={setModifyIndex}
        disabled={myBet.betDetails.length > 0 && modifyIndex === null}
      />
      {myBet.betDetails.length > 0 && (
        <AddStakeForm
          myBet={myBet}
          setMyBet={setMyBet}
          handleModifyBet={handleModifyBet}
          modifyIndex={modifyIndex}
          setModifyIndex={setModifyIndex}
        />
      )}
    </div>
  );
};

export default AddBetPage;
