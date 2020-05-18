import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();
  const userWithToken = await authenticateUserService.execute({
    email,
    password,
  });

  delete userWithToken.user.password;

  return res.json(userWithToken);
});

export default sessionsRouter;
