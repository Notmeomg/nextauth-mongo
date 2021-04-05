import Joi from "joi";

const schema = Joi.object({
  age: Joi.number(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  username: Joi.string().required(),
});

export default schema;
