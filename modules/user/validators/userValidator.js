const Joi = require('@hapi/joi');
const {
  logger,
  responses
} = require('../../../util');


const userValidations = {
  addUserFeedback: (req, res, next) => {
    const schema = Joi.object().keys({
      feedback: Joi.string().allow(''),
      userId: Joi.string().allow('')
    });

    const validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      console.log('validateBody error', validateBody.error)
      const errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  addSupportRequest: (req, res, next) => {
    const schema = Joi.object().keys({
      supportMessage: Joi.string().required(),
      type: Joi.number().required(),
      userId: Joi.string()
    });

    const validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      console.log('validateBody error', validateBody.error)
      const errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  addEth: (req, res, next) => {
    const schema = Joi.object().keys({
      diseaseName: Joi.string().required(),
      detectionDate: Joi.string().required(),
      healthCareProvider: Joi.string().required(),
      doctorInCharge: Joi.string().required(),
      commonName: Joi.string().required(),
      curedDate: Joi.string().allow(''),
      dischargeDate: Joi.string().allow(''),
      testConducted: Joi.string().allow(''),
      illinessDate: Joi.string().allow(''),
      document: Joi.string().allow(''),
      icdCode: Joi.string().allow(''),
      userId: Joi.string().allow('')
    });

    const validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      console.log('validateBody error', validateBody.error)
      const errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },

  editEhr: (req, res, next) => {
    const schema = Joi.object().keys({
      diseaseName: Joi.string(),
      detectionDate: Joi.string(),
      healthCareProvider: Joi.string(),
      doctorInCharge: Joi.string(),
      commonName: Joi.string(),
      curedDate: Joi.string().allow(''),
      dischargeDate: Joi.string().allow(''),
      testConducted: Joi.string().allow(''),
      illinessDate: Joi.string().allow(''),
      document: Joi.string().allow(''),
      icdCode: Joi.string().allow(''),
      id: Joi.string().required()
    });

    const validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      console.log('validateBody error', validateBody.error)
      const errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },


  editUser: (req, res, next) => {
    let schema = Joi.object().keys({
      userId: Joi.string(),
      userInfo: Joi.object().optional(),
      educationalInfo: Joi.array().optional(),
      emergencyContact: Joi.object().optional(),
      notificationFlag: Joi.boolean().optional(),
      userExperience: Joi.object().optional(),
      registrationStep: Joi.number().optional()
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


  personalHistory: (req, res, next) => {
    let schema = Joi.object().keys({
      addiction: Joi.string().allow(''),
      foodHabit: Joi.string().allow(''),
      appetite: Joi.string().allow(''),
      frequencyOfStools: Joi.string().allow(''),
      micturition: Joi.string().allow(''),
      sleep: Joi.string().allow(''),
      medications: Joi.string().allow(''),
      spectacle: Joi.string().allow(''),
      bloodGroup: Joi.string().allow(''),
      userId: Joi.string().allow(''),
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

  // past  History
  pastHistory: (req, res, next) => {
    let schema = Joi.object().keys({
      icdCode: Joi.string(),
      nameOfDisease: Joi.string(),
      duration: Joi.string(),
      diseaseImage: Joi.string(),
      procedureCode: Joi.string(),
      procedureDetails: Joi.string(),
      procedureImage: Joi.string(),
      medicineCode: Joi.string(),
      medicineName: Joi.string(),
      medicineImage: Joi.string(),
      userId: Joi.string().allow('')
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

  addInsurancePolicy: (req, res, next) => {
    let schema = Joi.object().keys({
      insuranceCompany: Joi.string(),
      premiumAmount: Joi.string(),
      policyType: Joi.string(),
      tpa: Joi.string(),
      commulativeBonusAmount: Joi.string(),
      expirationDate: Joi.string(),
      nomineeName: Joi.string(),
      policyNumber: Joi.string(),
      policyDocument: Joi.string(),
      policyStartDate: Joi.string(),
      policyRenewalDate: Joi.string(),
      interval: Joi.string(),
      type: Joi.number(),
      userId: Joi.string().allow(''),
      intermidiateryNumber: Joi.string().allow(''),
      sumInsure:Joi.string(),
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

  editInsurancePolicy: (req, res, next) => {
    let schema = Joi.object().keys({
      insuranceCompany: Joi.string(),
      premiumAmount: Joi.string(),
      policyType: Joi.string(),
      tpa: Joi.string(),
      commulativeBonusAmount: Joi.string(),
      interval: Joi.string(),
      nomineeName: Joi.string(),
      expirationDate: Joi.string(),
      policyNumber: Joi.string(),
      policyDocument: Joi.string(),
      policyStartDate: Joi.string(),
      policyRenewalDate: Joi.string(),
      type: Joi.number(),
      id: Joi.string().required(),
      intermidiateryNumber: Joi.string().allow('')
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
  addMenstrualHistory: (req, res, next) => {
    let schema = Joi.object().keys({
      lmpDetails: Joi.string(),
      deliveryDetails: Joi.string(),
      abortionDetails: Joi.string(),
      userId: Joi.string().allow(''),
      firstPeriodDate:Joi.string()
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

  addFamilyHistory: (req, res, next) => {
    let schema = Joi.object().keys({
      relation: Joi.string().required().allow(''),
      uid: Joi.string().allow(''),
      icdCode: Joi.string().allow(''),
      diseaseName: Joi.string().allow(''),
      duration: Joi.string().allow(''),
      procedureCode: Joi.string().allow(''), // optional filled
      procedureDetails: Joi.string().allow(''),
      medicineCode: Joi.string().allow(''),
      medicineName: Joi.string().allow(''),
      userId: Joi.string().allow('')
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

  editLabTest: (req, res, next) => {
    const schema = Joi.object().keys({
      testName: Joi.string(),
      prescriberName: Joi.string(),
      healthCareProvider: Joi.string(),
      doctorInCharge: Joi.string(),
      labTechnicianName: Joi.string(),
      labName: Joi.string(),
      testResult: Joi.string(),
      othersResult: Joi.string(),
      id: Joi.string().required()
    });

    const validateBody = Joi.validate(req.body, schema);
    if (validateBody.error) {
      console.log('validateBody error', validateBody.error)
      const errorMessage = validateBody.error.details[0].message;
      return responses.sendError(res, "", {}, errorMessage, 'PARAMETER_MISSING');
    }
    req.body = validateBody.value;
    next();
  },
}

module.exports = userValidations;