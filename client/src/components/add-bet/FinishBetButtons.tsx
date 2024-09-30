// import { ChangeEvent, Dispatch, useEffect, useState } from "react";
// import { Button } from "../common/Button";
// import { Bet } from "../../utils/types";

// type FinishBetButtonsProps = {
//   myBet: Bet[];
//   setMyBet: Dispatch<React.SetStateAction<Bet[]>>;
//   handleAddToParley: () => void;
//   addParlay: boolean;
// };

// export const FinishBetButtons = ({
//   myBet,
//   setMyBet,
//   handleAddToParley,
//   addParlay,
// }: FinishBetButtonsProps) => {
//   const [addStake, setAddStake] = useState(false);
//   const [potentialWin, setPotentialWin] = useState<string>("0.00");
//   // const [addStake, setAddStake] = useState(false);

//   useEffect(() => {
//     const potentialWin = () => {
//       const allOdds = myBet
//         .reduce((acc, bet) => acc * Number(bet.betDetails.odds), 1)
//         .toFixed(2);

//       if (myBet.length > 0) {
//         setPotentialWin((Number(allOdds) * myBet[0].stake).toFixed(2));
//       } else {
//         setPotentialWin("0.00");
//       }
//     };
//     potentialWin();
//   }, [myBet]);

//   const handleStakeChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newStake = parseFloat(e.target.value) || 0;

//     setMyBet((prevBets) => {
//       const updatedBets = [...prevBets];
//       if (updatedBets.length > 0) {
//         updatedBets[0].stake = newStake;
//       }
//       return updatedBets;
//     });
//   };

//   return (
//     <>
//       {!addStake ? (
//         <div className="finish-bet-buttons">
//           <div className="flex-container">
//             <Button
//               type="button"
//               onClick={() => setAddStake(true)}
//               className="btn big-btn-style"
//               children="Add Stake"
//               disabled={addParlay}
//             />
//             <Button
//               type="button"
//               onClick={handleAddToParley}
//               className="btn outline-btn"
//               children="Add to parley"
//               disabled={addParlay}
//             />
//           </div>
//         </div>
//       ) : (
//         <div className="finish-the-bet">
//           <div className="add-stake-input">
//             <div className="flex-container">
//               <input
//                 type="text"
//                 size={10}
//                 placeholder="Stake"
//                 value={myBet.length > 0 ? myBet[0].stake : ""}
//                 onChange={handleStakeChange}
//               />
//               <div className="mybet-slip-potential">
//                 <p>Potential Win:</p>
//                 <p>{potentialWin} &euro;</p>
//               </div>
//             </div>
//           </div>
//           <div className="finish-bet-buttons">
//             <div className="flex-container">
//               <Button
//                 type="submit"
//                 className="btn big-btn-style"
//                 children="Add Bet"
//               />
//               <Button
//                 type="button"
//                 onClick={() => {
//                   setAddStake(false);
//                   setMyBet(myBet.map((bet) => ({ ...bet, stake: 0 })));
//                 }}
//                 className="btn outline-btn"
//                 children="Cancel"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
