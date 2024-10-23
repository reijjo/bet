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

const addBet = async (newBet: Bet): Promise<Bet> => {
  console.log("axios bet", newBet);
  const res = await axios.post(baseUrl, newBet);
  return res.data;
};

const findBetById = async (id: number | string): Promise<Bet> => {
  console.log("AXIOS ID", id);
  const res = await axios.get(`${baseUrl}/${id}`);
  console.log("ACIOS BEBT", res.data);
  return res.data;
};

const modifyBet = async (bet: Bet): Promise<Bet> => {
  const res = await axios.put(`${baseUrl}/${bet.id}`, bet);
  return res.data;
};

export const betApi = {
  getAllBets,
  getMyBets,
  addBet,
  findBetById,
  modifyBet,
};
