# WEB-AI (Gemini Integration)

Ringkasan singkat proyek Node.js untuk mengintegrasikan layanan AI (Gemini).

## Deskripsi
Server API ringan yang menerima prompt dari klien, meneruskan ke layanan Gemini, dan mengembalikan respons AI. Cocok untuk eksperimen atau prototipe integrasi model.

## Struktur proyek
- `src/server.js` — entrypoint server
- `src/app.js` — setup aplikasi dan middleware
- `src/config/geminiKey.js` — konfigurasi kunci API (jangan commit kunci)
- `src/controller/gemini.controller.js` — logika pemanggilan Gemini dan handler
- `src/routes/gemini.routes.js` — definisi rute API

## Prasyarat
- Node.js 16+ (atau versi yang sesuai dengan `package.json`)

## Instalasi
Jalankan perintah berikut di root proyek:

```bash
npm install
```

## Konfigurasi
Simpan kunci API Gemini di `src/config/geminiKey.js` atau gunakan environment variable sesuai implementasi. Pastikan file yang berisi kunci tidak tercommit.

Contoh (environment variable):

```bash
export GEMINI_API_KEY="your_key_here"
# di Windows PowerShell:
$env:GEMINI_API_KEY="your_key_here"
```

## Menjalankan server

```bash
node src/server.js
# atau jika ada script npm:
npm start
```

Server biasanya berjalan di `http://localhost:3000` kecuali dikonfigurasi lain.

## Contoh pemanggilan endpoint

```bash
curl -X POST http://localhost:3000/gemini \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Halo, bantu saya membuat ringkasan."}'
```

## Pengembangan
- Lokasi handler utama: `src/controller/gemini.controller.js`.
- Tambahkan logging dan validasi input bila dipakai secara publik.