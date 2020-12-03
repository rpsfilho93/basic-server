import { container } from 'tsyringe';

import IHashProvider from './models/IHashProvider';
import BCriptHashProvider from './implementations/BCriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCriptHashProvider);
