import { checkSchema } from "express-validator";

export const UserValidator = {
  edit: checkSchema({
    token: {
      notEmpty: true,
      errorMessage: "Token inválido",
    },
    name: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "Nome precisa ter pelo menos 2 caracteres",
    },
    email: {
      optional: true,
      trim: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido",
    },
    password: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 6 },
      },
      errorMessage: "Senha inválida",
    },
    state: {
      optional: true,
      errorMessage: "Estado não preenchido",
    },
  }),
};
