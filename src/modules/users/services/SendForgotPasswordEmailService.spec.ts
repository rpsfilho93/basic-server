import AppError from '@shared/errors/AppError';
import FakeEmailProvider from '@shared/container/providers/EmailProviders/fakes/FakeEmailProvider';
import IEmailProvider from '@shared/container/providers/EmailProviders/models/IEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

let fakeUsersRepository: IUsersRepository;
let fakeEmailProvider: IEmailProvider;
let fakeUserTokensRepository: IUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeEmailProvider = new FakeEmailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send a recovery password email', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await sendForgotPasswordEmailService.execute({ email: user.email });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to send a recovery password email to a nonexistent user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'nonexistent-user@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to genrate a recovery password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await sendForgotPasswordEmailService.execute({ email: user.email });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
