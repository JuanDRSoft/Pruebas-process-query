const Collaborator = require('../models/Collaborator');

function findByLawyerAll(req, res, next) {
  Collaborator.find({ lawyer: req.usuario })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json('err');
    });
}

function find(req, res, next) {
  Collaborator.findById(req.params.id)
    .then((collaborator) => {
      req.collaborator = collaborator;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

function findByEmail(req, res, next) {
  let { email, uid } = req.body;
  Collaborator.findOne({ email: email, uid: uid })
    .then((collaborator) => {
      req.collaborator = collaborator;
      res.json(collaborator);
    })
    .catch((err) => {
      res.json(err);
    });
}

async function create(req, res, next) {
  let params = req.body;

  Collaborator.create(params)
    .then((collaborator) => {
      res.json(collaborator);
      req.collaborator = collaborator;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });
}

function update(req, res) {
  req.collaborator = Object.assign(req.collaborator, req.body);
  req.collaborator
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
  req.collaborator
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}
module.exports = {
  findByLawyerAll,
  create,
  update,
  destroy,
  find,
  findByEmail
};
