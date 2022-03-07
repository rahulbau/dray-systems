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
      organizationDetails: Joi.object().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
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
  getCoreCompetencies:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      userId: Joi.string().optional(),
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
  addCoreCompetencies: (req, res, next) => {
    let schema = Joi.object().keys({
      position : Joi.string().required(),
      experience : Joi.string().required(),
      rating : Joi.string().required(),
      topSkills : Joi.string().required(),
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

  addMediaFolders: (req, res, next) => {
    let schema = Joi.object().keys({
      name : Joi.string().required()
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
  getMediaFolders:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
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
  getMediaFromFolder:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      folderId: Joi.string().required()
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
  addMediaInFolder: (req, res, next) => {
    let schema = Joi.object().keys({
      folderId : Joi.string().required(),
      mediaUrl : Joi.string().required()
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

  verifyOrganizationName: (req, res, next) => {
    let schema = Joi.object().keys({
      name : Joi.string().required()
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
  addSite: (req, res, next) => {
    let schema = Joi.object().keys({
      name : Joi.string().required(),
      openings: Joi.number().required()
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

  getSite:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      organizationId: Joi.string().optional(),
      getAll: Joi.boolean().optional(),
      siteId: Joi.string().optional()
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
  addHRcordinator: (req, res, next) => {
    let schema = Joi.object().keys({
      name : Joi.string().required(),
      email: Joi.string().required(),
      designation: Joi.string().optional()
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
  assignHRcordinatorToSite: (req, res, next) => {
    let schema = Joi.object().keys({
      siteId : Joi.string().required(),
      cordinatorId: Joi.string().required(),
      status: Joi.number().required()
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
  getHRcordinator:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      cordinatorId: Joi.string().optional(),
      organizationId: Joi.string().optional()
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
  getOrganizationEmployee:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      searchString: Joi.string().optional(),
      organizationId: Joi.string().optional()
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
  getJobSite:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional()
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
  addJobSite: (req, res, next) => {
    let schema = Joi.object().keys({
      jobDetails : Joi.object().required(),
      longitude: Joi.number().optional(),
      latitude: Joi.number().optional(),
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
  getJobBasedUsers:  (req, res, next) => {
    let schema = Joi.object().keys({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      position: Joi.string().required()
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
}

module.exports = userValidations;