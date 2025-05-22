// routes/reset.js
const express = require('express');
const axios = require('axios');
const SensorData = require('../models/SensorData');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Reset counter di Raspberry Pi
    try {
      const piUrl = process.env.PI_HOST || 'localhost:5000';
      await axios.post(`http://${piUrl}/reset-counter`);
      console.log('Reset counter command sent to Pi');
    } catch (piErr) {
      console.error('Pi communication error:', piErr);
      // Continue even if Pi communication fails
    }
    
    // Buat record baru di MongoDB dengan counter direset
    const latestData = await SensorData
      .findOne()
      .sort({ timestamp: -1 });
    
    const newData = await new SensorData({
      // Pertahankan nilai sensor lainnya
      vibration_level: latestData ? latestData.vibration_level : "Safe",
      motor_voltage: latestData ? latestData.motor_voltage : 0,
      motor_current: latestData ? latestData.motor_current : 0,
      power_consumption: latestData ? latestData.power_consumption : 0,
      bottle_mass: latestData ? latestData.bottle_mass : 0,
      bottle_brightness: latestData ? latestData.bottle_brightness : 0,
      // Reset counter produk
      good_product: 0,
      bad_product: 0
    }).save();
    
    res.json({ 
      success: true,
      data: newData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;