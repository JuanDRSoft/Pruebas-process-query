const axios = require('axios');
const generateRandomString = require('../helpers/codePassword');
const Collaborator = require('../models/Collaborator');
const Lawyer = require('../models/Lawyer');
const { forgotPasswordEmail } = require('../utils/sendEmail');
const helpers = require('./helpers');

const validParams = ['name', 'phone', 'email', 'uid', 'role'];

function find(req, res, next) {
  Lawyer.findById(req.params.id)
    .then((lawyer) => {
      req.lawyer = lawyer;
      next();
    })
    .catch((err) => {
      next(err);
    });
}
function findByEmail(req, res, next) {
  let { email, uid, role } = helpers.buildParams(validParams, req.body);

  Lawyer.findOne({ email: email, uid: uid })
    .then((lawyer) => {
      req.lawyer = lawyer;
      res.json(lawyer);
    })
    .catch((err) => {
      res.json(err);
    });
}
function index(req, res) {
  Lawyer.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}
function show(req, res) {
  res.json(req.lawyer);
}
async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);

  Lawyer.create(params)
    .then((lawyer) => {
      res.json(lawyer);
      req.lawyer = lawyer;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });
}

function update(req, res) {
  req.lawyer = Object.assign(req.lawyer, req.body);
  req.lawyer
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}
function destroy(req, res) {
  req.lawyer
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

async function forgotPassword(req, res) {
  let { email } = helpers.buildParams(validParams, req.body);
  const lawyer = await Lawyer.findOne({ email: email });

  if (!lawyer) {
    const error = new Error('El usuario no existe');
    return res.status(400).json({ msg: error.message });
  }

  lawyer.uid = generateRandomString(10) || lawyer.uid;

  try {
    const lawyerAlmacenado = await lawyer.save();
    forgotPasswordEmail(email, lawyerAlmacenado);
    res.json({
      msg: `Hemos enviado un email con el codigo de seguridad al correo: ${email}`
    });
  } catch (error) {
    console.log(error);
  }
}

async function newPassword(req, res) {
  let { email, uid } = helpers.buildParams(validParams, req.body);
  const lawyer = await Lawyer.findOne({ email: email, uid: uid });

  if (!lawyer) {
    const error = new Error('Codigo de verificación incorrecto');
    return res.status(400).json({ msg: error.message });
  }

  lawyer.uid = req.body.newUid || lawyer.uid;

  try {
    await lawyer.save();
    res.json({
      msg: 'Contraseña actualizada correctamente'
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  find,
  findByEmail,
  forgotPassword,
  newPassword
};
