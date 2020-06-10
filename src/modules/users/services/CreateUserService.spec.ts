import AppError from '@shared/errors/appError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakesHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('password');
    expect(user.email).toBe('johndoe@gmail.com');
  });

  it('should not be able to create new user with the same email from another', async () => {
    const inputUser = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    };

    await createUser.execute(inputUser);

    await expect(createUser.execute(inputUser)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
