const Joi = require('@hapi/joi');
const {
  logger,
  responses
} = require('../../../util');

let userValidations = {
  // Signup Fields validation
  signUp: (req, res, next) => {
    let schema = Joi.object().keys({
      email: Joi.string().trim().email().required(),
      languageCode: Joi.string().optional().allow(''),
      password: Joi.string().optional(),
      role: Joi.number().optional(),
      userInfo: Joi.object().optional(),
      educationalInfo: Joi.array().optional(),
      emergencyContact: Joi.object().optional()
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

  // Login fields validation
  login: (req, res, next) => {
    let schema = Joi.object().keys({
      email: Joi.string().trim().email().required(),
      languageCode: Joi.string().optional().allow(''),
      password: Joi.string().required()
    })
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  resendOTP: (req, res, next) => {
    let schema = Joi.object().keys({
      type: Joi.number(),
      languageCode: Joi.string().allow(''),
      userPhone: Joi.string().required(),
    });
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },


  forgotOTP: (req, res, next) => {
    let schema = Joi.object().keys({
      type: Joi.number().required(),
      languageCode: Joi.string().allow(''),
      userEmail: Joi.string().trim().email().required(),
      role: Joi.number(),

    });
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  verifyOTP: (req, res, next) => {
    let schema = Joi.object().keys({
      type: Joi.number(),
      otp: Joi.string().required(),
      userPhone: Joi.string().trim().required(),
      languageCode: Joi.string().allow('')

    })
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  resetPassword: (req, res, next) => {
    let schema = Joi.object().keys({
      type: Joi.number().required(),
      otp: Joi.string().required(),
      userPassword: Joi.string().required(),
      userEmail : Joi.string().trim().email().required(),
      languageCode: Joi.string().allow('')

    })
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  changePassword: (req, res, next) => {
    let schema = Joi.object().keys({
      passwordOld: Joi.string().optional(),
      passwordNew: Joi.string().required(),
      languageCode: Joi.string().allow('')

    })
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  verifyEmail: (req, res, next) => {
    let schema = Joi.object().keys({
      email: Joi.string().required(),
      languageCode: Joi.string().allow('')

    })
    let validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  getCategory: (req, res, next) => {
    let schema = Joi.object().keys({
      type: Joi.number(),
      languageCode: Joi.string().allow(''),
      lat: Joi.string().allow(''),
      long: Joi.string().allow(''),
      parentId : Joi.string().allow(''),
      distance: Joi.number(),
      searchString: Joi.string().allow('')
    })
    let validateBody = Joi.validate(req.query, schema);
    if (validateBody.error) {
      let errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },
}

module.exports.userValidations = userValidations;