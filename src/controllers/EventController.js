const Event = require('../models/Event');

function findByLawyerAll(req, res, next) {
  Event.find({ lawyer: req.usuario })
    .sort([['startDate', +1]])
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json('err');
    });
}

async function create(req, res) {
  let params = req.body;

  Event.create(params)
    .then((event) => {
      res.json(event);
      req.event = event;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({ error });
    });
}

async function update(req, res) {
  req.event = Object.assign(req.event, req.body);
  req.event
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
  req.event
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function find(req, res, next) {
  Event.findById(req.params.id)
    .then((event) => {
      req.event = event;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { findByLawyerAll, create, destroy, find, update };
