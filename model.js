const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Scheduler = new Schema({
  taskType: { type: String, enum: ['SMS', 'MAIL'] },
  data: { type: Object },
  executeOn: { type: Date }
})
Scheduler.index({ executeOn: -1 })

module.exports = mongoose.model('scheduler', Scheduler)
