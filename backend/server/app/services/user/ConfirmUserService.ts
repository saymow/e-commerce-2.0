import User from '../../models/User';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import redis from '../../config/redis';
import { CONFIRM_EMAIL_PREFIX } from '../../constants';

class ConfirmUserService {
  async execute(token: string) {
    const usersRepository = getRepository(User);

    const redisKey = CONFIRM_EMAIL_PREFIX + token;

    const userEmail = await redis.get(redisKey);

    if (!userEmail) throw new AppError('Invalid confirmation token');

    await redis.del(redisKey);

    const user = await usersRepository.findOne({ email: userEmail });

    if (!user) throw new AppError('User not found', 404);
    if (user.is_confirmed) throw new AppError('User is already confirmed');

    user.is_confirmed = true;

    await usersRepository.save(user);
  }
}

export default ConfirmUserService;
