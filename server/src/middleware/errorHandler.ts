import type { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
	statusCode?: number;
}

export const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
	const statusCode = error.statusCode || res.statusCode || 500;

	const errorResponse = {
		success: false,
		timestamp: new Date().toISOString(),
		path: req.path,
		method: req.method,
		message: error.message || 'Internal server error',
		status: statusCode,
		// ...(Bun.env.NODE_ENV === 'development' && { stack: error.stack }),
	}

	console.error(`[Error] ${error.message}`, errorResponse);

	res.status(statusCode).json(errorResponse);
}