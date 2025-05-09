require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const sensorRoute = require('./routes/sensor');
const controlRoute = require('./routes/control');
const resetRoute = require('./routes/reset');

const app = express();
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✔️ MongoDB connected'))
  .catch(err => console.error(err));

// mount routes
app.use('/api/sensor', sensorRoute);
app.use('/api/control', controlRoute);
app.use('/api/reset', resetRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));