import AppError from '../../errors/AppError';
import User from '../../models/User';
import { getRepository } from 'typeorm';

class AdminConfirmUserService {
  async execute(adminId: string, userId: string) {
    const usersRepository = getRepository(User);

    const supposedAdmin = await usersRepository.findOne(adminId);

    if (!supposedAdmin)
      throw new AppError('Supposed admin user not found', 404);

    if (!supposedAdmin.is_admin)
      throw new AppError('User has no admin rights', 401);

    const user = await usersRepository.findOne(userId);

    if (!user) throw new AppError('User not found', 404);

    user.is_confirmed = !user.is_confirmed;

    await usersRepository.save(user);
  }
}

export default AdminConfirmUserService;
