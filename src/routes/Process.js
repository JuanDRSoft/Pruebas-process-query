var express = require('express');
var router = express.Router();

const ProcessController = require('../controllers/ProcessController');
const auth = require('../middleware/auth');

router
  .route('/')
  .get(auth, ProcessController.findByLawyer)
  .post(ProcessController.create);

router
  .route('/:id')
  .get(auth, ProcessController.find, ProcessController.show)
  .put(ProcessController.find, ProcessController.update)
  .delete(ProcessController.find, ProcessController.destroy);

router
  .route('/anexos/:filingNumber/:lawyer')
  .get(ProcessController.findLink, ProcessController.show)
  .put(ProcessController.findLink, ProcessController.updateLink)
  .delete(ProcessController.findLink, ProcessController.deleteLink);

router.route('/count/bylawyer').get(auth, ProcessController.findByLawyerCount);

router.route('/count/:usuario').get(ProcessController.findByCollaboratorCount);

router.route('/updateState/:id').get(ProcessController.updateState);

router.route('/id/:id').get(ProcessController.fetchProcessFn);

router.route('/update/state').get(ProcessController.updateStateAll);

router.route('/all/bylawyer').get(auth, ProcessController.findByLawyerAll);

router
  .route('/all/byCollaborator/:id')
  .get(ProcessController.findByCollaborator);

router
  .route('/all/bylawyer/home/:email')
  .get(ProcessController.processbyLawyerHome);

router
  .route('/processActive/bylawyer')
  .get(auth, ProcessController.findByLawyerCountUpdate);

module.exports = router;
