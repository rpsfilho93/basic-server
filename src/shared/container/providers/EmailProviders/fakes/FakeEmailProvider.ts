import IEmailProvider from '../models/IEmailProvider';
import ISendEmailDTO from '../dtos/ISendEmailDTO';

class FakeEmailProvider implements IEmailProvider {
  private emails: ISendEmailDTO[] = [];

  sendEmail(message: ISendEmailDTO): void {
    this.emails.push(message);
  }
}

export default FakeEmailProvider;
