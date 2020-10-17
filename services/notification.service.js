const events = require('events');

var em = new events.EventEmitter();

function sendNotificationToEmployee(jobId) {
  em.emit('Employee-'+jobId, jobId);
}

function sendNotificationToManager(jobId, employeeId) {
  em.emit('Manager-'+jobId, employeeId);
}

function subscribeToJobByManager(jobId) {
  em.on('Manager-'+jobId, function (data) {
    console.log('An Employee applied for Job.  EmployeeId: ' + data);
  });
}

function subscribeToJobByEmployee(jobId) {
  em.on('Employee-'+jobId, function (data) {
    console.log('Manager closed this job.  JobId: ' + data);
  });
}

module.exports = {
  sendNotificationToEmployee,
  sendNotificationToManager,
  subscribeToJobByManager,
  subscribeToJobByEmployee
}