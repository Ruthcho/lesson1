// Service for registrations
const registrations = require('../data/registration');

function getRegistrations() {
  return registrations;
}

function getRegistrationById(id) {
  return registrations.find((registration) => registration.id === id);
}

function createRegistration(data) {
  const newRegistration = {
    id: registrations.length + 1,
    studentId: parseInt(data.studentId),
    courseId: parseInt(data.courseId),
    date: new Date().toISOString().split('T')[0]
  };

  registrations.push(newRegistration);
  return newRegistration;
}

function updateRegistration(id, updates) {
  const registration = getRegistrationById(id);
  if (!registration) return null;

  if (updates.studentId) registration.studentId = parseInt(updates.studentId);
  if (updates.courseId) registration.courseId = parseInt(updates.courseId);

  return registration;
}

function deleteRegistration(id) {
  const index = registrations.findIndex((registration) => registration.id === id);
  if (index === -1) return null;

  const [deletedRegistration] = registrations.splice(index, 1);
  return deletedRegistration;
}

module.exports = {
  getRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
};
