import asyncHandler from 'express-async-handler';

export const index = asyncHandler(async (req, res, next) => {
  res.json({ message: 'welcome to my rest api' });
});
