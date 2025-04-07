import { ACCESS_SECRET } from '@conf/env';
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization !== ACCESS_SECRET) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  next();
});
