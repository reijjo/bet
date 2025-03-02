import { UserModel } from "../models/userModel";
import { Op } from "sequelize";

export const cleanupExpiredTokens = async () => {
  try {
    const now = new Date();

    // Find users with expired tokens
    const usersWithExpiredTokens = await UserModel.findAll({
      where: {
        resetTokenExpiration: {
          [Op.lt]: now, // Less than current time means expired
        },
        resetToken: {
          [Op.ne]: "", // Token is not an empty string
        },
      },
    });

    console.log(
      `Found ${usersWithExpiredTokens.length} users with expired verification tokens`,
    );

    // Update each user to clear their token
    for (const user of usersWithExpiredTokens) {
      await user.update({
        resetToken: "",
      });
    }

    return {
      success: true,
      cleanedCount: usersWithExpiredTokens.length,
    };
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

export const setupTokenCleanup = () => {
  const ONE_HOUR = 1000 * 60 * 60;

  setInterval(async () => {
    console.log("Running scheduled token cleanup...");
    await cleanupExpiredTokens();
  }, ONE_HOUR);
};
