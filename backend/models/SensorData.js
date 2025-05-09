// models/SensorData.js
const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  vibration_level: { type: String, enum: ['Safe', 'Danger'], default: 'Safe' }, // Diubah dari Number menjadi String
  motor_voltage: Number,
  motor_current: Number,
  power_consumption: Number,
  bottle_mass: Number,
  bottle_brightness: Number,
  good_product: { type: Number, default: 0 },
  bad_product: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorDataSchema);