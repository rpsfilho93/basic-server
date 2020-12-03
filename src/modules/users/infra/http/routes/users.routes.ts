import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import UsersController from '../controllers/UsersController';
import AvatarUserController from '../controllers/AvatarUserController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const avatarUserController = new AvatarUserController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
    }),
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  avatarUserController.update,
);

export default usersRouter;
