import AdminLoginService from '../services/session/AdminLoginService';
import { Request, Response } from 'express';
import { COOKIE_NAME } from '../constants';
import ChangePasswordService from '../services/session/ChangePasswordService';
import ForgotPasswordService from '../services/session/ForgotPasswordService';
import LoginService from '../services/session/LoginService';

class SessionController {
  async login(req: Request, res: Response) {
    const loginService = new LoginService();

    const { email, password } = req.body;

    const userId = await loginService.execute(email, password);

    req.session!.userId = userId;

    return res.send();
  }

  //Check if user is authenticated
  async status(req: Request, res: Response) {
    res.send();
  }

  async logout(req: Request, res: Response) {
    await new Promise((resolve, reject) => {
      req.session?.destroy(err => {
        res.clearCookie(COOKIE_NAME);

        if (err) {
          console.error(err);
          reject('Session error');
        }

        resolve();
      });
    });

    return res.send();
  }

  async forgotPassword(req: Request, res: Response) {
    const forgotPasswordService = new ForgotPasswordService();

    const { email } = req.params;

    await forgotPasswordService.execute(email);

    return res.send();
  }

  async changePassword(req: Request, res: Response) {
    const changePasswordService = new ChangePasswordService();

    const { token } = req.params;
    const { password } = req.body;

    await changePasswordService.execute(token, password);

    return res.send();
  }
}

export class AdminSessionController extends SessionController {
  async login(req: Request, res: Response) {
    const adminLoginService = new AdminLoginService();

    const { email, password } = req.body;

    const userId = await adminLoginService.execute(email, password);

    req.session!.userId = userId;

    return res.send();
  }
}

export default SessionController;
