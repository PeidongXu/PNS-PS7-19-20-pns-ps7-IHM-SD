const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Site', {
  latitude:Joi.number().required(),
  longitude:Joi.number().required(),
  title: Joi.string().required(),
  id: Joi.number().required()
});
