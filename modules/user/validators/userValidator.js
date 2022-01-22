const Joi = require('@hapi/joi');
const {
  logger,
  responses
} = require('../../../util');


const userValidations = {
  editUser: (req, res, next) => {
    let schema = Joi.object().keys({
      userId: Joi.string(),
      // userInfo: Joi.object().optional(),
      // educationalInfo: Joi.array().optional(),
      // emergencyContact: Joi.object().optional(),
      // notificationFlag: Joi.boolean().optional(),
      // userExperience: Joi.object().optional(),
      // registrationStep: Joi.number().optional()
      updateBody: Joi.object().required()
    });
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      console.log('validateBody error', validateBody.error)
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  getOrganizations:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      searchString: Joi.string().optional(),
    });
    let validateBody = Joi.validate(req.query, schema);
    if (validateBody.error) {
      console.log('validateBody error', validateBody.error)
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.query = validateBody.value;
    next();
  },
  addOrganizations: (req, res, next) => {
    let schema = Joi.object().keys({
      name: Joi.string().required()
    });
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      console.log('validateBody error', validateBody.error)
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  }
}

module.exports = userValidations;