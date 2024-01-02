import { checkSchema } from "express-validator";

export const AdValidator = {
  add: checkSchema({
    title: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: { min: 5 },
      },
      errorMessage: "Título precisa ter pelo menos 5 caracteres",
    },
    price: {
      optional: true,
      isNumeric: true,
      errorMessage: "Preço precisa ser um número",
    },
    priceNegotiable: {
      optional: true,
      isBoolean: true,
      errorMessage: "Preço negociável precisa ser um booleano",
    },
    description: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 30 },
      },
      errorMessage: "Descrição precisa ter pelo menos 30 caracteres",
    },
    idCategory: {
      notEmpty: true,
      isMongoId: true,
      errorMessage: "Categoria inválida",
    },
    images: {
      optional: true,
      isArray: true,
      errorMessage: "Imagens inválidas",
    },
  }),

  edit: checkSchema({
    id: {
      isMongoId: true,
      errorMessage: "ID inválido",
    },
    title: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 5 },
      },
      errorMessage: "Título precisa ter pelo menos 5 caracteres",
    },
    price: {
      optional: true,
      isFloat: true,
      errorMessage: "Preço precisa ser um número",
    },
    priceNegotiable: {
      optional: true,
      isBoolean: true,
      errorMessage: "Preço negociável precisa ser um booleano",
    },
    description: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 30 },
      },
      errorMessage: "Descrição precisa ter pelo menos 30 caracteres",
    },
    idCategory: {
      optional: true,
      isMongoId: true,
      errorMessage: "Categoria inválida",
    },
    images: {
      optional: true,
      isArray: true,
      errorMessage: "Imagens inválidas",
    },
  }),
};
