// models/SystemStatus.js
const mongoose = require('mongoose');

const SystemStatusSchema = new mongoose.Schema({
  status: Boolean,
  reason: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SystemStatus', SystemStatusSchema);