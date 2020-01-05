const Joi = require('@hapi/joi');
const {
  logger,
  responses
} = require('../../../util');

let userValidations = {
  // Signup Fields validation
  signUp: (req, res, next) => {
    let schema = Joi.object().keys({
      userEmail: Joi.string().trim().email().required(),
      userFullName: Joi.string().required(),
      languageCode: Joi.string().allow(''),
      userPhone: Joi.string().required(),
      role: Joi.number(),
      userCountry: Joi.string(),
      shopName: Joi.string()
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
      userPhone: Joi.string().trim().required(),
      role: Joi.number(),
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
      userPasswordOld: Joi.string().required(),
      userPasswordNew: Joi.string().required(),
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

  checkUid: (req, res, next) => {
    let schema = Joi.object().keys({
      uid: Joi.string().required(),
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
      type: Joi.number().required(),
      languageCode: Joi.string().allow(''),
      lat: Joi.string().allow(''),
      long: Joi.string().allow(''),
      parentId : Joi.string().allow(''),
      distance: Joi.number()
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