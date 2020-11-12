import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

export const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.session!.user.id) throw new AppError('User not authenticated', 401);

  return next();
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepository = getRepository(User);

  const user = await usersRepository.findOne(req.session!.user.id);

  if (!user) throw new AppError('User not found', 404);

  if (!user.is_admin) throw new AppError('User hasnt admin rights', 401);

  next();
};
