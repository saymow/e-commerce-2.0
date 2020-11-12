import { getRepository } from 'typeorm';
import argon2 from 'argon2';

import AppError from '../../errors/AppError';
import User from '../../models/User';

class AdminLoginService {
  async execute(email: string, password: string) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
      select: [
        'password',
        'id',
        'name',
        'email',
        'birth_date',
        'contact_number',
        'is_confirmed',
        'is_admin',
        'created_at',
        'updated_at',
      ],
    });

    if (!user) throw new AppError('Email or password incorrect', 401);

    if (!user.is_admin) throw new AppError('User has no admin rights', 401);

    if (!(await argon2.verify(user.password, password)))
      throw new AppError('Email or password incorrect', 401);

    return user;
  }
}

export default AdminLoginService;
