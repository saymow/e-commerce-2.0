import User from '../../models/User';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { v4 } from 'uuid';
import redis from '../../config/redis';
import { CONFIRM_EMAIL_PREFIX } from '../../constants';
import queue from '../../lib/Queue';
import { confirmAccountEmailView } from '../../views/email';

class SendUserConfirmationEmail {
  async execute(userId: string) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) throw new AppError('User not found', 404);

    if (user.is_confirmed) throw new AppError('User already confirmed');

    let token = v4();

    await redis.set(
      CONFIRM_EMAIL_PREFIX + token,
      user.email,
      'ex',
      60 * 60 * 24 * 2
    );

    queue.add('UserConfirmationEmail', {
      email: user.email,
      subject: 'Confirm account',
      html: confirmAccountEmailView(user.name, token),
    });

    return token;
  }
}

export default SendUserConfirmationEmail;
