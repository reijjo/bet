import "./AddBetPage.css";

import { useAddBetForm } from "@/features/add-bet/hooks/useAddBetForm";
import { AddBetDetailsForm } from "@/features/add-bet/components/forms/add-bet-form/AddBetDetailsForm";
import { AddStakeForm } from "./add-stake-form/AddStakeForm";

const AddBetPage = () => {
  const { modifyId, setModifyId, handleModifyBet, myBet, setMyBet } =
    useAddBetForm();

  console.log("mybetdetails length", myBet.betDetails.length);
  console.log("modifyID", modifyId);

  return (
    <div className="wrapper grid-row-2 addbet-page">
      <AddBetDetailsForm
        myBet={myBet}
        setMyBet={setMyBet}
        modifyId={modifyId}
        setModifyId={setModifyId}
        disabled={myBet.betDetails.length > 0 && modifyId === null}
      />
      <AddStakeForm
        myBet={myBet}
        setMyBet={setMyBet}
        handleModifyBet={handleModifyBet}
        modifyId={modifyId}
        setModifyId={setModifyId}
      />
    </div>
  );
};

export default AddBetPage;
