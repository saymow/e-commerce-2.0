import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { redis } from '../..';
import { FORGOT_PASS_PREFIX } from '../../constants';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import { forgotPasswordEmailView } from '../../views/email';
import EmailSenderService from '../mailer';

class ForgotPasswordService {
  async execute(email: string) {
    const usersRepository = getRepository(User);
    const emailSenderService = new EmailSenderService();

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) throw new AppError('Invalid Email.', 404);

    const token = v4();

    await redis.set(
      FORGOT_PASS_PREFIX + token,
      user.id,
      'ex', // SET TIME IN SECS
      60 * 60 * 24 * 1
    );

    await emailSenderService.execute({
      email: user.email,
      subject: 'Rocover password',
      html: forgotPasswordEmailView(user.name, token),
    });

    return token;
  }
}

export default ForgotPasswordService;
