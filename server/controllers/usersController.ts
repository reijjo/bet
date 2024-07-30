import type { Request, Response } from "express";
import { User } from "../models";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json({ data: allUsers });
  } catch (error: unknown) {
    console.log("Error fetching users: ", error);
    res.status(500).json({ message: "Error getting all users" });
  }
};
