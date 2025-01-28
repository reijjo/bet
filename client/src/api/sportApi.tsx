import axios from "axios";

import { Sport } from "../utils/types";

const baseUrl = "http://localhost:3001/sports";

const getSports = async (): Promise<Sport[]> => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const sportApi = {
  getSports,
};
