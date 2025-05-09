LANGKAH-LANGKAH MEMULAI WEB DASHBOARD CONVEYOR MONITORING VENDOR GAMMA
1. Install Node.js dan MongoDB terlebih dahulu (jika belum ada).
2. Klik "Code", lalu Download ZIP.
3. Ekstrak "FEBE-Gamma-Industri-main.zip".
4. Buka folder yang telah diekstrak menggunakan VSCode.
5. Pada bagian atas, klik "View" -> "Terminal".
6. Ketika terminal terbuka, pastikan sudah berada di direktori folder yang benar.
7. Ketik npm install pada terminal, lalu enter. Tunggu hingga instalasi selesai.
8. Ketik cd backend pada terminal, lalu enter.
9. Ketik node server.js, lalu enter untuk menjalankan server. Jika berhasil, muncul 🚀 Server running on port 5000 ✔️ MongoDB connected
10. Buka terminal baru dengan klik tanda "+" .
11. Ketik npm run dev, lalu enter.
12. Klik http://localhost:5173/ untuk membuka web dashboard.
13. Jika sudah berhasil untuk pertama kali, seterusnya cukup ulangi dari langkah 4 untuk membuka web.

PENTING:
Untuk terhubung ke Raspberry Pi, buka file .env pada folder backend menggunakan VSCode.
Kemudian, atur PI_HOST menjadi IP lokal Raspberry Pi. Selain itu, pastikan bagian sensor_url = "http://{IP Address}:5000/api/sensor"
pada kode Raspberry Pi juga diganti dengan IP lokal Raspberry Pi (sama dengan IP yang diatur pada PI_HOST di file .env)
