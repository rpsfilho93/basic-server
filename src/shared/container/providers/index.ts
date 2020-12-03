import { container } from 'tsyringe';

import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';

import IEmailProvider from './EmailProviders/models/IEmailProvider';
import EtheralEmailProvider from './EmailProviders/implementations/EtheralEmailProvider';

import IEmailTemplateProvider from './EmailTemplateProviders/models/IEmailTemplateProvider';
import HandleBarsEmailTemplateProvider from './EmailTemplateProviders/implementations/HandleBarsEmailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IEmailTemplateProvider>(
  'EmailTemplateProvider',
  HandleBarsEmailTemplateProvider,
);

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  container.resolve(EtheralEmailProvider),
);
