import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

import orphanageView from '../views/api/user_view';

import CreateUserService from '../services/user/CreateUserService';
import UpdateUserService from '../services/user/UpdateUserService';
import ConfirmUserService from '../services/user/ConfirmUserService';
import SetAdminService from '../services/user/SetAdminService';
import AdminConfirmUserService from '../services/user/AdminConfirmUserService';
import AdminDeleteUserService from '../services/user/AdminDeleteUserService';
import AdminUpdateUserService from '../services/user/AdminUpdateUserService';

class UserController {
  async create(req: Request, res: Response) {
    const createUserService = new CreateUserService();

    const { name, email, password, birth_date, contact_number } = req.body;

    const user = await createUserService.execute({
      name,
      email,
      password,
      birth_date,
      contact_number,
    });

    req.session!.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.status(201).send(orphanageView.render(user));
  }

  async show(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const userId = req.session!.user.id;

    const user = await usersRepository.findOne(userId);

    if (!user) throw new AppError('User not found', 404);

    return res.send(user);
  }

  async update(req: Request, res: Response) {
    const updateUserService = new UpdateUserService();

    const data = req.body;
    const id = req.session!.user.id;

    const user = await updateUserService.execute(id, data);

    return res.send(user);
  }

  async destroy(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const id = req.session!.user.id;

    await usersRepository.delete(id);

    req.session?.destroy(() => {
      return res.send();
    });
  }
}

export class AdminUserController extends UserController {
  async create(req: Request, res: Response) {
    const createUserService = new CreateUserService();

    const { name, email, password, birth_date, contact_number } = req.body;

    const user = await createUserService.execute({
      name,
      email,
      password,
      birth_date,
      contact_number,
    });

    return res.status(201).send(orphanageView.render(user));
  }

  async index(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return res.send(users);
  }

  async update(req: Request, res: Response) {
    const adminUpdateUserService = new AdminUpdateUserService();

    const { id } = req.params;
    const data = req.body;
    const adminId = req.session!.user.id;

    const user = await adminUpdateUserService.execute(id, data, adminId);

    return res.send(user);
  }

  async show(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const { id } = req.params;

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError('User not found', 404);

    return res.send(user);
  }

  async destroy(req: Request, res: Response) {
    const adminDeleteUserService = new AdminDeleteUserService();

    const { id } = req.params as { id: string };
    const adminId = req.session!.user.id;

    await adminDeleteUserService.execute(adminId, id);

    res.send();
  }

  async confirm(req: Request, res: Response) {
    const adminConfirmUserService = new AdminConfirmUserService();
    const { id } = req.params;
    const adminId = req.session!.user.id;

    await adminConfirmUserService.execute(adminId, id);

    return res.send();
  }

  async setAdmin(req: Request, res: Response) {
    const setAdminService = new SetAdminService();

    const { id } = req.params;
    const adminId = req.session!.user.id;

    await setAdminService.execute(adminId, id);

    return res.send();
  }
}

export default UserController;
