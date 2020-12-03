import IParseEmailTemplateDTO from '../../EmailTemplateProviders/dtos/IParseEmailTemplateDTO';

interface IEmailContact {
  name: string;
  email: string;
}

export default interface ISendEmailDTO {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  templateData: IParseEmailTemplateDTO;
}
