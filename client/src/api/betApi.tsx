import axios from "axios";
import { Bet } from "../utils/types";

const baseUrl = "http://localhost:3001/bets";

const getAllBets = async (): Promise<Bet[]> => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getMyBets = async (id: number): Promise<Bet[]> => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export const betApi = {
  getAllBets,
  getMyBets,
};
