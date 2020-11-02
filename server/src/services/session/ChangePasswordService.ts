import { getRepository } from 'typeorm';
import argon2 from 'argon2';
import * as Yup from 'yup';
import { redis } from '../..';
import { FORGOT_PASS_PREFIX } from '../../constants';
import AppError from '../../errors/AppError';
import User from '../../models/User';

const schema = Yup.object().shape({
  password: Yup.string()
    .required()
    .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/), // Minimum eight characters, letter upper and lower case and numbers.
});

class ChangePasswordService {
  async execute(token: string, password: string) {
    const usersRepository = getRepository(User);

    const key = FORGOT_PASS_PREFIX + token;

    const userId = await redis.get(key);

    if (!userId) throw new AppError('Invalid recover password token');

    await schema.validate(
      { password },
      {
        abortEarly: false,
      }
    );

    await redis.del(key);

    const hashedPass = await argon2.hash(password);

    await usersRepository.update({ id: userId }, { password: hashedPass });
  }
}

export default ChangePasswordService;
