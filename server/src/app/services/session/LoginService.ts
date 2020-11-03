import { getRepository } from 'typeorm';
import argon2 from 'argon2';

import AppError from '../../errors/AppError';
import User from '../../models/User';

class LoginService {
  async execute(email: string, password: string) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
      select: ['password', 'id'],
    });

    if (!user) throw new AppError('Email or password incorrect', 401);

    if (!(await argon2.verify(user.password, password)))
      throw new AppError('Email or password incorrect', 401);

    return user.id;
  }
}

export default LoginService;
