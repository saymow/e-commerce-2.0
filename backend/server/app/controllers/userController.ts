import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

import orphanageView from '../views/api/user_view';

import CreateUserService from '../services/user/CreateUserService';
import UpdateUserService from '../services/user/UpdateUserService';

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

    req.session!.userId = user.id;

    return res.status(201).send(orphanageView.render(user));
  }

  async show(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const userId = req.session!.userId;

    const user = await usersRepository.findOne(userId);

    if (!user) throw new AppError('User not found', 404);

    return res.send(user);
  }

  async update(req: Request, res: Response) {
    const updateUserService = new UpdateUserService();

    const data = req.body;
    const id = req.session!.userId;

    const user = await updateUserService.execute(id, data);

    return res.send(user);
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
    const updateUserService = new UpdateUserService();

    const { id } = req.route.params;
    const data = req.body;

    const user = await updateUserService.execute(id, data);

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
    const usersRepository = getRepository(User);

    const id = req.session!.userId;

    await usersRepository.delete(id);

    return res.send();
  }
}

export default UserController;
