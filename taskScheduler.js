const Scheduler = require('./model')

const submitTask = async (data) => {
  Scheduler
    .create(data)
    .then(console.log)
    .catch(console.log)
}

module.exports = {
  submitTask
}
