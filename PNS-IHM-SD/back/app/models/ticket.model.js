const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Ticket', {
  title: Joi.string().required(),
  date: Joi.date().required(),
  author: Joi.string().required(),
});
