const Joi = require('joi')
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Event', {
  siteID: Joi.number().required(),
  date: Joi.string().required(),
  startHour: Joi.string().required(),
  endHour: Joi.string().required(),
  sport: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});
