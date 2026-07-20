// Controller for registrations
const {
  getRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
} = require('../services/registration');

function getRegistrationsController(req, res) {
  res.json(getRegistrations());
}

function getRegistrationByIdController(req, res) {
  const registrationId = parseInt(req.params.id);
  const registration = getRegistrationById(registrationId);

  if (!registration) return res.status(404).json({ message: 'הרישום לא נמצא' });

  res.json(registration);
}

function createRegistrationController(req, res) {
  const registration = createRegistration(req.body);
  res.status(201).json(registration);
}

function updateRegistrationController(req, res) {
  const registrationId = parseInt(req.params.id);
  const updatedRegistration = updateRegistration(registrationId, req.body);

  if (!updatedRegistration) return res.status(404).json({ message: 'הרישום לא נמצא' });

  res.json(updatedRegistration);
}

function deleteRegistrationController(req, res) {
  const registrationId = parseInt(req.params.id);
  const deletedRegistration = deleteRegistration(registrationId);

  if (!deletedRegistration) return res.status(404).json({ message: 'הרישום לא נמצא' });

  res.json({ message: 'הרישום בוטל בהצלחה' });
}

module.exports = {
  getRegistrationsController,
  getRegistrationByIdController,
  createRegistrationController,
  updateRegistrationController,
  deleteRegistrationController
};
