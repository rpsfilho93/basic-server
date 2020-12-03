import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfileService: ShowUserProfileService;

describe('ShowUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserProfileService = new ShowUserProfileService(fakeUsersRepository);
  });

  it("should be able to show an user's profile.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const showUser = await showUserProfileService.execute({
      user_id: user.id,
    });

    expect(showUser.name).toBe('John Doe');
    expect(showUser.email).toBe('johndoe@email.com');
  });

  it("should not be able to show a nonexistent user's profile.", async () => {
    await expect(
      showUserProfileService.execute({
        user_id: 'nonexistent-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
