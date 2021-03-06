import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const userWithToken = await authenticateUserService.execute({
      email,
      password,
    });

    delete userWithToken.user.password;

    return response.json(userWithToken);
  }
}
