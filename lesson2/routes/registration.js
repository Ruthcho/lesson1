// Routes for registrations
const express = require('express');
const router = express.Router();
const {
  getRegistrationsController,
  getRegistrationByIdController,
  createRegistrationController,
  updateRegistrationController,
  deleteRegistrationController
} = require('../controllers/registration');

router.get('/', getRegistrationsController);
router.get('/:id', getRegistrationByIdController);
router.post('/', createRegistrationController);
router.put('/:id', updateRegistrationController);
router.delete('/:id', deleteRegistrationController);

module.exports = router;
