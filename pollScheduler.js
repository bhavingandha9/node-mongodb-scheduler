const Scheduler = require('./model')
const model = require('./model')

const checkSchedulerForTask = async () => {
  let data = await Scheduler.findOne({ executeOn: { $lte: new Date() } }).limit(1) // check if any task exists

  if (!data) {
    console.log('no data')
    setTimeout(() => { checkSchedulerForTask() }, 1000) // no tasks right now, check after N
    return
  } else {

    switch (data.taskType) { // send it to execute to other function / queue
      case 'SMS':
        sendSMS(data.data)
      default:
      // do default casing
    }

    await Scheduler.deleteOne({ _id: data._id }) // delete that task so it does not repeat

    checkSchedulerForTask() // check for next task
  }
}

const sendSMS = (sendSMSdata) => console.log('sendSMS', sendSMSdata)

module.exports = {
  checkSchedulerForTask
}
