import User from '../../models/User';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

class ConfirmUserService {
  async execute(id: string) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError('User not found', 404);

    if (user.is_confirmed) throw new AppError('User is already confirmed');

    user.is_confirmed = true;

    await usersRepository.save(user);
  }
}

export default ConfirmUserService;
