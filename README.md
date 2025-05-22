# 🚀 Conveyor Monitoring Dashboard – Vendor Gamma

Sistem ini merupakan antarmuka dashboard berbasis web untuk memantau dan mengendalikan sistem konveyor berbasis Raspberry Pi secara real-time. Dashboard ini dilengkapi dengan pemantauan sensor getaran, arus, tegangan, massa, dan kecerahan produk, serta kontrol manual dan otomatis berdasarkan parameter keselamatan.

---

## ✅ Fitur Utama

- 📈 Real-time monitoring data sensor
- 🧠 Auto shutdown saat kondisi berbahaya terdeteksi
- 🕹️ Kontrol manual ON/OFF konveyor dari dashboard
- 🔃 Reset jumlah produk
- 🔗 Terhubung dengan Raspberry Pi dan MongoDB

---

## ⚙️ Langkah-Langkah Menjalankan Dashboard

### 1️⃣ Instalasi Awal

Pastikan sudah menginstal:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community)

---

### 2️⃣ Unduh Proyek

- Klik tombol `Code` → `Download ZIP`
- Ekstrak file `FEBE-Gamma-Industri-main.zip`
- Buka folder hasil ekstrak menggunakan **Visual Studio Code**

---

### 3️⃣ Buka Terminal & Install Dependensi

Di dalam VS Code, buka terminal (`View → Terminal`) *gunakan Command Prompt alih-alih menggunakan PowerShell untuk mencegah SecurityError, lalu jalankan:

```bash
npm install
cd backend
npm install dotenv --save
```

---

### 4️⃣ Jalankan Backend (Express)

```bash
node server.js
```

Jika berhasil, akan muncul:

```
🚀 Server running on port 5000
✔ MongoDB connected
```

---

### 5️⃣ Jalankan Frontend (React)

Buka terminal baru (sebaiknya pakai Command Prompt alih-alih menggunakan PowerShell untuk mencegah SecurityError):

```bash
npm run dev
```

Buka browser dan akses:  
[http://localhost:5173](http://localhost:5173)

---

## 🌐 Konfigurasi Koneksi ke Raspberry Pi

### 💻 Di Laptop (Backend)

1. Buka file `.env` di folder `backend`
2. Ubah baris berikut:

```env
PI_HOST=http://192.168.X.X:5000
```

> Gunakan `hostname -I` di terminal Raspberry Pi untuk mengetahui alamat IP-nya.

---

### 🍓 Di Raspberry Pi (Python)

Pastikan file Python kamu memiliki baris berikut:

```python
sensor_url = "http://<IP_LAPTOP>:5000/api/sensor"
```

> Ganti `<IP_LAPTOP>` dengan hasil dari perintah `ipconfig` pada terminal Windows (alamat IP laptop yang menjalankan dashboard).

---

## 🗄️ Cara Membuat Database Baru di MongoDB

### 1. Buka file `.env` di folder `backend`, ubah:

```env
MONGO_URI=mongodb://localhost:27017/conveyor_final
```

> Ganti `conveyor_final` dengan nama database yang kamu inginkan.

> MongoDB akan otomatis membuat database ini saat data pertama dikirim dari Raspberry Pi.

---

### 2. Jalankan ulang backend:

```bash
cd backend
node server.js
```

---

## 🧭 Cara Mengakses Database dengan MongoDB Compass

1. Buka aplikasi **MongoDB Compass**
2. Klik **"New Connection"**
3. Masukkan URI:

```bash
mongodb://localhost:27017
```

4. Klik **Connect**
5. Pilih database `conveyor_final` (atau nama lainnya)
6. Kamu akan melihat koleksi seperti:
   - `sensordatas`

---

## 🔁 Menjalankan Ulang di Lain Waktu

Setelah setup awal berhasil, kamu hanya perlu:

```bash
# Jalankan backend
cd backend
node server.js
```

```bash
# Terminal baru - jalankan frontend
npm run dev
```

Lalu buka browser:  
[http://localhost:5173](http://localhost:5173)

---

## 📞 Kontak

Untuk pertanyaan atau saran, silakan hubungi:  
👤 GitHub: [@timow256](https://github.com/timow256)
