import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthentication);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      password_confirmation: Joi.ref('password'),
      old_password: Joi.string(),
    }).with('password', ['old_password', 'password_confirmation']),
  }),
  profileController.update,
);

profileRouter.get('/', profileController.show);

export default profileRouter;
