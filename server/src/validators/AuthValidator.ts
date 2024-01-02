import { checkSchema } from "express-validator";

export const AuthValidator = {
  login: checkSchema({
    email: {
      notEmpty: true,
      trim: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido",
    },
    password: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: { min: 6 },
      },
      errorMessage: "Senha inválida",
    },
  }),
  register: checkSchema({
    name: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "Nome precisa ter pelo menos 2 caracteres",
    },
    email: {
      notEmpty: true,
      trim: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido",
    },
    password: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: { min: 6 },
      },
      errorMessage: "Senha precisa ter pelo menos 6 caracteres",
    },
    state: {
      notEmpty: true,
      isMongoId: true,
      errorMessage: "Estado não preenchido",
    },
  }),
};
