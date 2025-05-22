# 🚀 Conveyor Monitoring Dashboard – Vendor Gamma

Sistem ini merupakan antarmuka dashboard berbasis web untuk memantau dan mengendalikan sistem konveyor berbasis Raspberry Pi secara real-time. Dashboard ini dilengkapi dengan pemantauan sensor getaran, arus, tegangan, massa, dan kecerahan produk, serta kontrol manual dan otomatis berdasarkan parameter keselamatan.

---

## ✅ Fitur Utama

- 📈 Real-time monitoring data sensor
- 🧠 Auto shutdown saat kondisi berbahaya terdeteksi
- 🕹️ Kontrol manual ON/OFF konveyor dari dashboard
- 🔃 Reset jumlah produk baik/buruk
- 🔗 Terhubung dengan Raspberry Pi dan MongoDB

---

## ⚙️ Langkah-Langkah Menjalankan Dashboard

### 1️⃣ Instalasi Awal
Pastikan kamu sudah menginstal:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community)

### 2️⃣ Unduh Proyek
- Klik tombol `Code` → `Download ZIP`
- Ekstrak file `FEBE-Gamma-Industri-main.zip`
- Buka folder hasil ekstrak menggunakan **Visual Studio Code**

### 3️⃣ Buka Terminal & Install Dependensi
Di dalam VS Code, buka terminal (`View → Terminal`), lalu jalankan:

```bash
npm install
npm install dotenv --save
