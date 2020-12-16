import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { WEB_VIEW_URL } from '../constants';
import AppError from '../errors/AppError';
import User from '../models/User';
import UpdateConfirmedUserEmailService from '@services/user/UpdateConfirmedUserEmailService';
import AdminConfirmUserService from '@services/user/AdminConfirmUserService';
import AdminDeleteUserService from '@services/user/AdminDeleteUserService';
import AdminUpdateUserService from '@services/user/AdminUpdateUserService';
import ConfirmUserService from '@services/user/ConfirmUserService';
import CreateUserService from '@services/user/CreateUserService';
import SendUserConfirmationEmail from '@services/user/SendUserConfirmationEmail';
import SetAdminService from '@services/user/SetAdminService';
import UpdateUserService from '@services/user/UpdateUserService';
import userView from '../views/api/user_view';

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

    return res.status(201).send(userView.render(user));
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

    let caveatMessage;
    const data = req.body;
    const id = req.session!.user.id;

    const { user, confirmationEmail } = await updateUserService.execute(
      id,
      data
    );

    if (confirmationEmail)
      caveatMessage =
        'Its look like that you are trying to update your account email, a confirmation email was sent to your current email.';

    return res.send({
      user,
      caveatMessage,
    });
  }

  async destroy(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const id = req.session!.user.id;

    await usersRepository.delete(id);

    req.session?.destroy(() => {
      return res.send();
    });
  }

  async sendConfirmation(req: Request, res: Response) {
    const sendUserConfirmationEmail = new SendUserConfirmationEmail();

    const userId = req.session!.user.id;

    await sendUserConfirmationEmail.execute(userId);

    return res.send();
  }

  async confirm(req: Request, res: Response) {
    const confirmUserService = new ConfirmUserService();

    const token = req.params.token;

    await confirmUserService.execute(token);

    return res.redirect(`${WEB_VIEW_URL}/profile`);
  }

  async cofirmNewEmail(req: Request, res: Response) {
    const updateConfirmedUserEmailService = new UpdateConfirmedUserEmailService();

    const token = req.params.token;

    await updateConfirmedUserEmailService.execute(token);

    return res.redirect(`${WEB_VIEW_URL}/profile`);
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

    return res.status(201).send(userView.render(user));
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
