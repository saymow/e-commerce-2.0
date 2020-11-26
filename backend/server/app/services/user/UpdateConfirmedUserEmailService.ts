import AppError from '../../errors/AppError';
import { getRepository } from 'typeorm';
import redis from '../../config/redis';
import User from '../../models/User';
import { EDIT_EMAIL_PREFIX } from '../../constants';

class UpdateConfirmedUserEmailService {
  async execute(token: string) {
    const usersRepository = getRepository(User);

    const redisKey = EDIT_EMAIL_PREFIX + token;

    const payload = await redis.get(redisKey);

    if (!payload) throw new AppError('Invalid update email token');

    await redis.del(redisKey);

    const { email, newEmail } = JSON.parse(payload);

    const user = await usersRepository.findOne({ email });

    if (!user)
      throw new AppError(
        'The user you are trying to update does not exist, thought, it might be a problem on our side :(.',
        404
      );

    user.email = newEmail;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateConfirmedUserEmailService;
