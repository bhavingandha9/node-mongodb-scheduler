require('dotenv').config()
const mongoose = require('mongoose')
const { submitTask } = require('./taskScheduler')
const { checkSchedulerForTask } = require('./pollScheduler')

mongoose.connect(process.env.DB_URL, { promiseLibrary: global.Promise, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    const executeOn = new Date()
    executeOn.setSeconds(executeOn.getSeconds() + 5)

    submitTask({
      taskType: 'SMS',
      executeOn,
      data: {
        to: 'BOSS',
        message: 'I\'m Still Working'
      }
    }) // submit task to done after 5 sec

    checkSchedulerForTask() // start the scheduler polling
  })
  .catch(error => {
    console.log('Connection to Database failed..')
  })