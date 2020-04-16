import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();
    const userWithToken = await authenticateUserService.execute({
      email,
      password,
    });

    delete userWithToken.user.password;

    return res.json(userWithToken);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
