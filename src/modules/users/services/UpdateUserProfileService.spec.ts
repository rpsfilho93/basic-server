import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to update the user's name.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'New Name',
      email: 'johndoe@email.com',
    });

    expect(updatedUser.name).toBe('New Name');
  });

  it("should be able to update the user's email.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'newemail@email.com',
    });

    expect(updatedUser.email).toBe('newemail@email.com');
  });

  it('should not be able to update a nonexistent user.', async () => {
    await expect(
      updateUserProfileService.execute({
        user_id: 'nonexistent-id',
        name: 'New Name',
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update to an another user's email.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await fakeUsersRepository.create({
      name: 'Robin Williams',
      email: 'robinwilliams@email.com',
      password: '123123',
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'robinwilliams@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update the user's password.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      old_password: '123123',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it("should not be able to update the user's password without old password.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the user's password with wrong old password.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
        old_password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
