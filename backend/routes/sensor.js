const express = require('express');
const axios   = require('axios');
const SensorData = require('../models/SensorData');
const router  = express.Router();

// ——————————————————————————————————
// 1) Endpoint POST untuk testing via Postman
// ——————————————————————————————————
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    // simpan payload ke MongoDB
    await new SensorData(data).save();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// routes/sensor.js - update GET endpoint
router.get('/', async (req, res) => {
  try {
    // Ambil data dari Raspberry Pi
    const { data } = await axios.get(`http://${process.env.PI_HOST}/sensor`);
    
    // Simpan data ke MongoDB untuk logging
    await new SensorData(data).save();
    
    // Kirim data ke frontend
    return res.json(data);
  } catch (err) {
    // Jika gagal terhubung ke Pi, ambil data terakhir dari MongoDB
    console.error('Error fetching from Pi:', err.message);
    
    try {
      const [latest] = await SensorData
        .find()
        .sort({ timestamp: -1 })
        .limit(1);
      return res.json(latest || {});
    } catch (dbErr) {
      return res.status(500).json({ error: dbErr.message });
    }
  }
});

module.exports = router;
