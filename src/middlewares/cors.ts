import { NextFunction, Request, Response } from "express";

export function cors(request: Request, response: Response, next: NextFunction) {
  const allowedOrigins = [
    process.env.ALLOWED_ORIGIN_1,
    'http://localhost:3000',
    'http://localhost:3002'
  ];

  const origin = request.header('origin')!;
  const isAllowed = allowedOrigins.includes(origin);

  if (isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Max-Age', '10');
  }

  next();
};
