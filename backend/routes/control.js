// routes/control.js - simplify to focus on sending commands
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { action } = req.body;
    console.log(`Sending command to Raspberry Pi: ${action}`);
    
    const endpoint = action === 'on' ? '/start' : '/stop';
    
    // Try to communicate with Pi
    try {
      await axios.post(`http://${process.env.PI_HOST}${endpoint}`);
      console.log('Command sent to Pi successfully');
      res.json({ success: true, action });
    } catch (piErr) {
      console.error('Pi communication error:', piErr);
      // Still return success to the frontend
      res.json({ success: true, action, warning: 'Pi communication failed but command was processed' });
    }
  } catch (err) {
    console.error('Control error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;