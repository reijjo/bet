import "./ModifyBetSlip.css";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Error, Loading } from "../..";
import { useGetBetDetailsQuery } from "../../../features/api/detailsApiSlice";
import { Bet } from "../../../utils/types";
import { FinishModify } from "./FinishModify";
import {
  ModifyBetHeaders,
  ModifyBetMatch,
  ModifyBetMore,
  ModifyBetOdds,
  ModifyBetResultInputs,
  ModifyBetSelection,
} from "./modify-betslip";

type MyBetsProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  handleModifyBet: (index: number) => void;
};

export type Result = {
  [key: number]: {
    home_result: string;
    away_result: string;
    betbuilder_result: string[];
  };
};

export const ModifyBetSlip = ({
  myBet,
  setMyBet,
  handleModifyBet,
}: MyBetsProps) => {
  const [result, setResult] = useState<Result>({});

  const {
    data: detailsData,
    isLoading,
    isError,
    error,
  } = useGetBetDetailsQuery(myBet.id as number, {
    skip: !myBet.id,
    refetchOnMountOrArgChange: true,
  });

  // TODO: ON MOBILE show selection and make a result to open on click
  // POPOVER html css

  // Makes enough result objects for each bet
  useEffect(() => {
    if (!detailsData) return;

    const initialResult: Result = {};
    detailsData?.forEach((bet) => {
      initialResult[Number(bet.id)] = {
        home_result: bet.home_result || "",
        away_result: bet.away_result || "",
        betbuilder_result:
          bet.betbuilder_result ||
          (bet.betbuilder_selection && bet.betbuilder_selection.length > 0
            ? Array(bet.betbuilder_selection.length).fill("")
            : []),
      };
    });
    setResult(initialResult);
  }, [detailsData]);

  console.log("THIS DETAILS DATA", detailsData);

  // Return
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;
  return (
    <div className="modifybet-container">
      <div className="modifybet-add-stake">
        <ModifyBetHeaders />
        {detailsData?.map((bet) => (
          <div key={bet.id} className="finish-modifybet-slip">
            <ModifyBetMatch bet={bet} />
            <ModifyBetResultInputs
              bet={bet}
              result={result}
              betIndex={Number(bet.id)}
              setResult={setResult}
            />
            <ModifyBetSelection details={bet} betIndex={Number(bet.id)} />
            <ModifyBetOdds details={bet} />
            <ModifyBetMore
              handleModifyBet={handleModifyBet}
              betIndex={Number(bet.id)}
            />
          </div>
        ))}
        <FinishModify
          myBet={myBet}
          setMyBet={setMyBet}
          result={result}
          details={detailsData ?? []}
        />
      </div>
    </div>
  );
};
