import { validatorEmail, validatorPassword } from '@/utils/validators/index';

export const userSigInConfig = (required: boolean) => ({
  email: validatorEmail,
  password: validatorPassword(required)
});
