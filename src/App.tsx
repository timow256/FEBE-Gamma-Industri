import axios from 'axios';
import React, { useState, useEffect } from "react";
import {
  Activity,
  Power,
  RotateCcw,
  Box,
  ZapOff,
  Thermometer,
  Gauge,
  Zap,
  Image,
  Shield,
  AlertTriangle,
} from "lucide-react";

function App() {
  // State for sensor data
  const [sensorData, setSensorData] = useState({
    vibration_level: "Safe",
    motor_voltage: "-",
    motor_current: "-",
    power_consumption: "-",
    bottle_mass: "-",
    bottle_brightness: "-",
    good_product: 0,
    bad_product: 0,
    status_sys: 1
  });

  // State for power system
  const [powerStatus, setPowerStatus] = useState({
    status: false,
    reason: "",
  });

  const [autoControl, setAutoControl] = useState(true);

  const [userPowerSelection, setUserPowerSelection] = useState(false);

  // Modify the fetchData function to respect user selection
const fetchData = async () => {
  try {
    // Only fetch sensor data, not power status
    const sensorRes = await axios.get('/api/sensor');
    
    setSensorData({
      vibration_level: sensorRes.data.vibration_level || "Safe",
      motor_voltage: sensorRes.data.motor_voltage || "-",
      motor_current: sensorRes.data.motor_current || "-",
      power_consumption: sensorRes.data.power_consumption || "-",
      bottle_mass: sensorRes.data.bottle_mass || "-",
      bottle_brightness: sensorRes.data.bottle_brightness || "-",
      good_product: sensorRes.data.good_product || 0,
      bad_product: sensorRes.data.bad_product || 0,
      status_sys: sensorRes.data.status_sys ?? 1
    });
    
  } catch (err) {
    console.error('Polling error:', err);
  }
};

// Modify the togglePower function to only control local state and send commands
const togglePower = async (on: boolean) => {
  try {
    // Update the user selection state
    setUserPowerSelection(on);
    setAutoControl(false); // menonaktifkan auto mode
    // Update the displayed power status immediately
    setPowerStatus({
      status: on,
      reason: on ? 'Manual activation' : 'Manual deactivation'
    });
    
    // Send the command to the Raspberry Pi without waiting for response
    axios.post('/api/control', { action: on ? 'on' : 'off' })
      .then(() => console.log(`Command sent: ${on ? 'ON' : 'OFF'}`))
      .catch(err => console.error('Control error:', err));
    
  } catch (err) {
    console.error('Control error:', err);
  }
};

// App.tsx - update the resetCount function
const resetCount = () => {
  // Immediately update UI
  setSensorData(prevData => ({
    ...prevData,
    good_product: 0,
    bad_product: 0,
  }));
  
  // Send the reset command to the server without waiting
  axios.post('/api/reset')
    .then(() => console.log('Reset command sent'))
    .catch(err => console.error('Reset error:', err));
};

useEffect(() => {
  fetchData();
  const intervalId = setInterval(fetchData, 1000);
  return () => clearInterval(intervalId);
}, []);

useEffect(() => {
  const statusToSet = sensorData.status_sys === 1;

  setPowerStatus({
    status: statusToSet,
    reason: statusToSet ? "Normal" : "Emergency Shutdown"
  });
}, [sensorData.status_sys]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold leading-none tracking-tight">
                <span style={{ color: "#009bbf" }}>V</span>
                <span className="text-black">G</span>
              </h1>
            </div>
            <h1 className="ml-4 text-xl font-semibold text-black">
              Vendor Gamma
            </h1>
          </div>
          <h2 className="text-lg font-medium text-gray-700">
            Conveyor Monitoring System
          </h2>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
{/* Vibration Level - Diubah menjadi status Safe/Danger */}
<div className="bg-gradient-to-br from-amber-400 to-rose-500 rounded-xl p-6 text-white shadow-lg">
  <div className="flex justify-between items-start mb-2">
    <h3 className="text-lg font-medium">Vibration Status</h3>
    <Gauge className="h-5 w-5" />
  </div>
  <div className="mt-2">
    {sensorData.vibration_level === "Safe" ? (
      <div className="flex flex-col items-center">
        <div className="bg-green-500 text-white text-center py-2 px-4 rounded-full w-32 mb-2">
          <p className="text-2xl font-semibold">Safe</p>
        </div>
        <Shield className="h-12 w-12 text-green-300 mt-2" />
      </div>
    ) : (
      <div className="flex flex-col items-center">
        <div className="bg-red-600 text-white text-center py-2 px-4 rounded-full w-32 mb-2 animate-pulse">
          <p className="text-2xl font-semibold">Danger</p>
        </div>
        <AlertTriangle className="h-12 w-12 text-red-300 mt-2" />
      </div>
    )}
  </div>
</div>

          {/* Motor Voltage */}
          <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">Motor Voltage</h3>
              <Zap className="h-5 w-5" />
            </div>
            <div className="mt-2">
              <p className="text-5xl font-semibold">
                {sensorData.motor_voltage}
              </p>
              <p className="text-sm mt-4">Volt</p>
            </div>
          </div>

          {/* Motor Current */}
          <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">Motor Current</h3>
              <Activity className="h-5 w-5" />
            </div>
            <div className="mt-2">
              <p className="text-5xl font-semibold">
                {sensorData.motor_current}
              </p>
              <p className="text-sm mt-4">Ampere</p>
            </div>
          </div>

          {/* Power Consumption */}
          <div className="bg-gradient-to-br from-indigo-400 to-blue-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">Power Consumption</h3>
              <Thermometer className="h-5 w-5" />
            </div>
            <div className="mt-2">
              <p className="text-5xl font-semibold">
                {sensorData.power_consumption}
              </p>
              <p className="text-sm mt-4">kW</p>
            </div>
          </div>
        </div>

        {/* System Status & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Conveyor System */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-3">
            <div className="flex justify-between mb-2">
              <div
        className={`inline-flex items-center px-3 py-1 rounded-lg text-white ${
          powerStatus.status ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "bg-red-600"
        }`}
      >
                <span className="text-sm font-medium">
                  {powerStatus.status ? "Running" : "Stopped"}
                </span>
              </div>

              <div className="flex space-x-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Belt Type</p>
                  <p className="font-medium">Single Belt</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Motor</p>
                  <p className="font-medium">Stepper</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Section Length</p>
                  <p className="font-medium">50 cm</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Belt Material</p>
                  <p className="font-medium">Plastic</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 h-80 flex items-center justify-center">
         <img src="./src/conveyor.jpg" 
         alt="Conveyor System"
         width={400}
        height={300}
        className="max-h-[80%] max-w-[90%] object-contain"/>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-medium text-center mb-4">
              Control System
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Power System</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => togglePower(true)}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                      powerStatus.status
                        ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
                        : "border border-teal-400 text-teal-500"
                    }`}
                  >
                    On
                  </button>

                  <button
                    onClick={() => togglePower(false)}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                      !powerStatus.status
                        ? "bg-gradient-to-r from-amber-400 to-red-400 text-white"
                        : "border border-red-300 text-red-400"
                    }`}
                  >
                    Off
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-600">Reset Count</p>
                <button
                  onClick={resetCount}
                  className="px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-500 text-white transition-colors hover:opacity-90 flex items-center"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-500 mb-1">Good Products</p>
                  <p className="text-4xl font-semibold">
                    {sensorData.good_product}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Bad Products</p>
                  <p className="text-4xl font-semibold">
                    {sensorData.bad_product}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Mass</p>
                <p className="text-4xl font-semibold">
                  {sensorData.bottle_mass}
                </p>
                <p className="text-sm text-gray-500 mt-2">gram</p>
              </div>
              <div className="text-center border-l border-gray-200 pl-4">
                <p className="text-gray-600 mb-2">Brightness</p>
                <p className="text-4xl font-semibold">
                  {sensorData.bottle_brightness}
                </p>
                <p className="text-sm text-gray-500 mt-2">Lux</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div
                className={`h-3 w-3 rounded-full mr-2 ${
                  powerStatus.status ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <p className="text-gray-600">
                System Status:{" "}
                <span className="font-medium">
                  {powerStatus.status ? "Online" : "Offline"}
                </span>
              </p>
            </div>
            <p className="text-gray-500">
              {powerStatus.status
                ? "The conveyor system is currently operational and processing items."
                : "The conveyor system is currently powered off."}
            </p>
            <div className="mt-4 flex items-center justify-end">
              {powerStatus.status ? (
                <Power className="h-8 w-8 text-green-500" />
              ) : (
                <ZapOff className="h-8 w-8 text-red-500" />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
