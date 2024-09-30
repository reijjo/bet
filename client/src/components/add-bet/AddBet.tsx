import "./AddBet.css";
import { AddBetForm } from "../index";
import { useState } from "react";
import { Bet } from "../../utils/types";
// import { MyBetSlip } from "./MyBetSlip";
import { initialBetValues } from "./betUtils";

export const AddBet = () => {
  const [myBet, setMyBet] = useState<Bet>(initialBetValues);
  // const [newBet, setNewBet] = useState<Bet>(initialBetValues[]);
  const [modifyIndex, setModifyIndex] = useState<number | null>(null);
  const [addParlay, setAddParlay] = useState(false);

  // const handleModifyBet = (index: number) => {
  //   // setNewBet(myBet[index]);
  //   setModifyIndex(index);
  //   setAddParlay(true);
  //   setTimeout(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }, 100);
  // };

  // const handleAddToParley = () => {
  //   // setNewBet((prev) => ({
  //   //   ...prev,
  //   //   betDetails: initialBetDetailValues,
  //   // }));
  //   setAddParlay(true);
  //   setTimeout(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }, 100);
  // };

  return (
    <div className="wrapper">
      <AddBetForm
        myBet={myBet}
        setMyBet={setMyBet}
        modifyIndex={modifyIndex}
        addParlay={addParlay}
        setAddParlay={setAddParlay}
        setModifyIndex={setModifyIndex}
      />
      {/* {myBet.length > 0 && (
        <MyBetSlip
          myBet={myBet}
          setMyBet={setMyBet}
          handleModifyBet={handleModifyBet}
          handleAddToParley={handleAddToParley}
          modifyIndex={modifyIndex}
          addParlay={addParlay}
          // newBet={newBet}
          // setNewBet={setNewBet}
        />
      )} */}
    </div>
  );
};
