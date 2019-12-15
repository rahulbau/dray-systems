const Joi = require('@hapi/joi');
const {
  logger,
  responses
} = require('../../../util');


const userValidations = {
  addMemberStat: (req, res, next) => {
    const schema = Joi.object().keys({
      heartRate: Joi.string().allow(''),
      bloodPressure: Joi.string().allow(''),
      respiratoryRate: Joi.string().allow(''),
      bloodSugar: Joi.string().allow(''),
      temperature: Joi.string().allow(''),
      weight: Joi.string().allow(''),
      height: Joi.string().required(),
      pulseRate: Joi.string().allow(''),
      waistSize: Joi.string().allow(''),
      wristSize: Joi.string().allow(''),
      abdomenSize: Joi.string().allow(''),
      chestSize: Joi.string().allow(''),
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

  addLabTest: (req, res, next) => {
    const schema = Joi.object().keys({
      testName: Joi.string().required(),
      prescriberName: Joi.string().required(),
      healthCareProvider: Joi.string().required(),
      doctorInCharge: Joi.string().required(),
      labTechnicianName: Joi.string().required(),
      labName: Joi.string().required(),
      testResult: Joi.string().allow(''),
      othersResult: Joi.string().allow(''),
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
      userFirstName: Joi.string().allow(''),
      userLastName: Joi.string().allow(''),
      username: Joi.string().allow(''),
      languageCode: Joi.string().allow(''),
      userPhone: Joi.string().allow(''),
      userPic: Joi.string().allow(''),
      userDob: Joi.string().allow(''),
      height: Joi.string().allow(''),
      weight: Joi.string().allow(''),
      userId: Joi.string().allow(''),
      dependent: Joi.number(),
      gender: Joi.string().allow(''),
      maritalStatus: Joi.string().allow(''),
      numberOfDependents: Joi.number(),
      fatherName: Joi.string().allow(''),
      motherName: Joi.string().allow(''),
      identificationMark: Joi.string().allow(''),
      surveyorNumber: Joi.string().allow(''),
      nativeVillage: Joi.string().allow(''),
      district: Joi.string().allow(''),
      state: Joi.string().allow(''),
      idProof: Joi.string().allow(''),
      idProofNumber: Joi.string().allow(''),
      idProofImage: Joi.string().allow(''),
      communicationAddress: Joi.string().allow(''),
      permanentAddress: Joi.string().allow(''),
      occupation: Joi.string().allow(''),
      occupationalAddress: Joi.string().allow(''),
      qualification: Joi.string().allow(''),
      extraCurricular: Joi.string().allow(''),
      clubMembership: Joi.string().allow(''),
      emergencyContactPerson: Joi.string().allow(''),
      familyDoctor: Joi.string().allow(''),
      familyDoctorAddress: Joi.string().allow(''),
      relationUid: Joi.string().allow(''),
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