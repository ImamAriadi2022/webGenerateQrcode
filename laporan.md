# ANALISIS FUNCTION POINT PARKFINDER WEB QR GENERATOR

## 1. Tujuan Analisis

Analisis Function Point dilakukan untuk mengukur ukuran fungsional perangkat lunak ParkFinder Web QR Generator berdasarkan fungsi yang diberikan kepada pengguna, bukan berdasarkan jumlah baris kode, halaman, komponen, atau struktur direktori. Pengukuran dilakukan dengan mengaudit source code aktual untuk mengidentifikasi seluruh fungsi yang memenuhi karakteristik lima jenis fungsi Function Point, yaitu External Input (EI), External Output (EO), External Query (EQ), Internal Logical File (ILF), dan External Interface File (EIF).

Dari hasil identifikasi diperoleh nilai Unadjusted Function Point (UFP). Nilai tersebut selanjutnya disesuaikan dengan empat belas Degree of Influence yang dinilai berdasarkan implementasi aktual untuk memperoleh General Characteristics Adjustment (GCA), kemudian dihitung nilai Function Point akhir dengan mengalikan UFP dengan GCA. Seluruh angka pada laporan ini dapat ditelusuri dari bukti pada source code.

## 2. Ruang Lingkup dan Batas Aplikasi

Batas aplikasi ditentukan berdasarkan fungsi yang diberikan kepada pengguna, bukan berdasarkan struktur folder. ParkFinder Web QR Generator merupakan subsistem frontend berbasis React yang berjalan pada komputer kiosk di pintu gerbang masuk parkir. Seluruh fungsi interaktif berada di dalam boundary aplikasi, sedangkan data area dan pembuatan tiket dikelola oleh backend REST API, dan dokumen tiket dikelola pada Firebase Cloud Firestore.

Aktor tunggal yang berinteraksi dengan aplikasi adalah Admin Area, yaitu petugas/admin pintu gerbang parkir yang menggunakan aplikasi untuk menghasilkan tiket masuk berbasis QR Code.

| No | Elemen | Keterangan |
|---|---|---|
| 1 | Nama aplikasi | ParkFinder Web QR Generator (Website Generated Tiket) |
| 2 | Aktor | Admin Area (petugas/admin pintu gerbang parkir) |
| 3 | Boundary aplikasi | Seluruh fungsi antarmuka, logika interaksi, state machine generator tiket, penyimpanan sesi/cache pada localStorage, dan sinkronisasi real-time di sisi klien web |
| 4 | Sistem eksternal | Backend REST API ParkFinder (autentikasi, data area, pembuatan tiket) dan Firebase Cloud Firestore (dokumen tiket) |
| 5 | Sumber data eksternal | API backend (data area, hasil generate tiket, sesi autentikasi) dan Firestore (status dokumen tiket) |

Data bisnis utama (area dan tiket) dikelola oleh sistem eksternal dan tidak dipelihara dalam bentuk file logis internal pada aplikasi ini. Data pada `localStorage` (token, user, adminAreas, selectedAreaId) merupakan cache dan sesi teknis yang tidak memenuhi definisi Internal Logical File.

## 3. Identifikasi Fungsi Fungsional

Identifikasi dilakukan dengan menelusuri seluruh source code pada direktori `src/`. Fungsi yang diidentifikasi adalah fungsi yang melintasi boundary aplikasi dan bermakna bagi pengguna (Admin Area), dengan mengacu pada proses bisnis utama yaitu proses generate tiket. Fungsi yang hanya merupakan elemen antarmuka atau mekanisme teknis tidak diidentifikasi sebagai Function Point.

| No | Nama Fungsi | Deskripsi Fungsi | Aktor/Sumber | Jenis Fungsi |
|---|---|---|---|---|
| 1 | Login | Admin Area memasukkan email dan kata sandi, sistem mengautentikasi melalui `POST /auth/login`, menyimpan token dan data pengguna, lalu mengarahkan ke halaman utama | Admin Area | EI |
| 2 | Melihat Daftar Area | Admin Area melihat daftar gedung/area yang tersedia yang dimuat melalui `GET /areas` dan ditampilkan pada dropdown header | Admin Area | EQ |
| 3 | Memilih Area Parkir | Admin Area memilih area gerbang aktif dari dropdown; pilihan disimpan pada `localStorage` dan memengaruhi area yang digunakan untuk generate tiket | Admin Area | EI |
| 4 | Generate Tiket | Admin Area memicu pembuatan tiket dengan parameter area dan jenis kendaraan melalui `POST /gate/generateTicket`; sistem memproses dan menampilkan hasil tiket beserta QR Code | Admin Area | EI |
| 5 | Batalkan Tiket | Admin Area membatalkan tiket aktif dengan memperbarui status dokumen tiket menjadi `cancelled` pada Firestore | Admin Area | EI |
| 6 | Logout | Admin Area mengakhiri sesi melalui `POST /auth/logout`, membersihkan data sesi pada `localStorage`, dan dikembalikan ke halaman login | Admin Area | EI |

### Fungsi yang Diidentifikasi sebagai Bukan Function Point

- Memilih Jenis Kendaraan: tidak diimplementasikan sebagai input pengguna; nilai `vehicleType` bersifat tetap `'mobil'`.
- Mencetak Tiket: tidak ditemukan implementasi pencetakan pada source code.
- Menghasilkan Kode Tiket: kode tiket dihasilkan oleh backend; frontend hanya menerima dan menampilkannya.
- Menampilkan QR Code dan Informasi Tiket: merupakan respons dari transaksi Generate Tiket.
- Menyalin Kode Tiket: mekanisme teknis clipboard.
- Pemantauan Status Tiket Real-Time: mekanisme teknis sinkronisasi Firestore (`onSnapshot`).
- Countdown Timer, Toggle Tema, Tampilkan/Sembunyikan Kata Sandi, Guard Rute: elemen antarmuka atau mekanisme teknis.

## 4. Penentuan Kompleksitas Fungsi

Kompleksitas ditentukan berdasarkan jumlah Data Element Type (DET) dan File Type Referenced (FTR) yang teridentifikasi pada source code. Seluruh fungsi yang diidentifikasi memiliki jumlah DET rendah dan FTR paling banyak satu, sehingga diklasifikasikan Low.

| No | Fungsi | Jenis FP | Kompleksitas | Alasan Penentuan |
|---|---|---|---|---|
| 1 | Login | EI | Low | Dua DET (email, kata sandi) dan satu FTR (API autentikasi); bukti `src/features/auth/api/index.js` dan `src/features/auth/hooks/useAuth.js` |
| 2 | Melihat Daftar Area | EQ | Low | Dua DET (id, name) dan satu FTR (API `/areas`); tanpa pemrosesan turunan; bukti `src/features/qr-generator/api/index.js` |
| 3 | Memilih Area Parkir | EI | Low | Satu DET (areaId) dan tanpa referensi file logis internal/eksternal; bukti `useTicketGenerator.js` |
| 4 | Generate Tiket | EI | Low | Dua DET (areaId, vehicleType) dan satu FTR (API `/gate/generateTicket`); bukti `useTicketGenerator.js` dan `TicketForm.jsx` |
| 5 | Batalkan Tiket | EI | Low | Satu DET (ticketId) dan satu referensi dokumen Firestore; bukti `src/features/qr-generator/api/index.js` |
| 6 | Logout | EI | Low | Tanpa DET berarti dan satu FTR (API `/auth/logout`); bukti `src/features/auth/hooks/useAuth.js` |

Tidak terdapat fungsi dengan kompleksitas Medium atau High pada aplikasi ini.

## 5. Perhitungan Unadjusted Function Point

| Jenis Fungsi | Low | Medium | High |
|---|---|---:|---:|---:|
| External Input (EI) | 3 | 4 | 6 |
| External Output (EO) | 4 | 5 | 7 |
| External Query (EQ) | 3 | 4 | 6 |
| Internal Logical File (ILF) | 7 | 10 | 15 |
| External Interface File (EIF) | 5 | 7 | 10 |

| No | Fungsi | Jenis | Kompleksitas | Bobot | FP |
|---|---|---|---|---|---:|---:|
| 1 | Login | EI | Low | 3 | 3 |
| 2 | Melihat Daftar Area | EQ | Low | 3 | 3 |
| 3 | Memilih Area Parkir | EI | Low | 3 | 3 |
| 4 | Generate Tiket | EI | Low | 3 | 3 |
| 5 | Batalkan Tiket | EI | Low | 3 | 3 |
| 6 | Logout | EI | Low | 3 | 3 |

Rekapitulasi:

| Jenis Fungsi | Low | Medium | High | Total |
|---|---|---:|---:|---:|---:|
| EI | 5 | 0 | 0 | 5 |
| EO | 0 | 0 | 0 | 0 |
| EQ | 1 | 0 | 0 | 1 |
| ILF | 0 | 0 | 0 | 0 |
| EIF | 0 | 0 | 0 | 0 |
| Total | 6 | 0 | 0 | 6 |

Perhitungan eksplisit UFP:

```
UFP = (EI Low × 3) + (EI Medium × 4) + (EI High × 6)
    + (EO Low × 4) + (EO Medium × 5) + (EO High × 7)
    + (EQ Low × 3) + (EQ Medium × 4) + (EQ High × 6)
    + (ILF Low × 7) + (ILF Medium × 10) + (ILF High × 15)
    + (EIF Low × 5) + (EIF Medium × 7) + (EIF High × 10)
```

```
UFP = (5 × 3) + (0 × 4) + (0 × 6)
    + (0 × 4) + (0 × 5) + (0 × 7)
    + (1 × 3) + (0 × 4) + (0 × 6)
    + (0 × 7) + (0 × 10) + (0 × 15)
    + (0 × 5) + (0 × 7) + (0 × 10)
```

```
UFP = 15 + 0 + 0 + 0 + 0 + 0 + 3 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 0
UFP = 18
```

Nilai UFP tidak dibulatkan, yaitu **18**.

## 6. Penilaian Degree of Influence

| No | General System Characteristic | Nilai | Dasar Penilaian |
|---|---|---|---:|---|
| 1 | Data Communications | 4 | Seluruh fungsi interaktif berkomunikasi melalui telekomunikasi: HTTP (axios) untuk login, logout, `/areas`, dan `/gate/generateTicket`, serta Firebase Firestore untuk sinkronisasi real-time |
| 2 | Distributed Functions | 4 | Pemrosesan didistribusikan antara klien (React, render QR, state machine) dan server (backend REST serta Firestore); transfer data on-line dua arah |
| 3 | Performance | 2 | Terdapat kebutuhan waktu-nyata pada countdown masa berlaku tiket (600 detik) dan deteksi status `claimed` melalui `onSnapshot`, namun tanpa persyaratan SLA kinerja eksplisit |
| 4 | Heavily Used Configuration | 0 | Tidak terdapat kebutuhan konfigurasi perangkat keras khusus atau pertimbangan densitas penyimpanan |
| 5 | Transaction Rate | 0 | Tingkat transaksi rendah (operasional satu kiosk gerbang); tanpa persyaratan throughput tinggi |
| 6 | On-Line Data Entry | 5 | Seluruh fungsi EI (5 fungsi) merupakan entri data on-line interaktif; lebih dari 30% fungsi berinteraksi dengan entri data on-line |
| 7 | End-User Efficiency | 3 | Tersedia fasilitas efisiensi pengguna: dropdown pemilihan area, tombol salin kode, indikator sisa waktu, tampilan status, dan indikator loading |
| 8 | On-Line Updating | 2 | Terdapat pembaruan data on-line (pembatalan tiket pada Firestore dan pengelolaan sesi), namun aplikasi tidak memelihara ILF internal |
| 9 | Complex Processing | 0 | Tidak terdapat pemrosesan kompleks; QR Code dirender oleh pustaka pihak ketiga (`qrcode.react`) dan logika bisnis utama ditangani backend |
| 10 | Reusability | 4 | Kode disusun berbasis fitur (`features/`, `core/`, `shared/`), hooks custom dapat digunakan ulang, dan lapisan API terpusat |
| 11 | Installation Ease | 3 | Instalasi standar npm dengan dokumentasi pada README dan konfigurasi variabel lingkungan melalui `.env` |
| 12 | Operational Ease | 3 | Tersedia penanganan kesalahan (banner error), indikator loading, logging konsol, dan indikator status operasional |
| 13 | Multiple Sites | 3 | Aplikasi dirancang berjalan pada banyak kiosk gerbang parkir dengan pemilihan area per instalasi dan konfigurasi berbasis lingkungan |
| 14 | Facilitate Change | 4 | Struktur modular berbasis fitur dan konfigurasi terpusat (variabel lingkungan, lapisan API) memudahkan perubahan |
| | **Total** | **37** | |

Total Degree of Influence (TDI) = **37**.

## 7. Perhitungan General Characteristics Adjustment

```
GCA = 0,65 + (0,01 × TDI)
GCA = 0,65 + (0,01 × 37)
GCA = 0,65 + 0,37
GCA = 1,02
```

## 8. Perhitungan Function Point

```
FP = UFP × GCA
FP = 18 × 1,02
FP = 18,36
```

Nilai Function Point yang diperoleh untuk ParkFinder Web QR Generator adalah sebesar **18,36 FP**.

## 9. Rekapitulasi Hasil

| Komponen | Nilai |
|---|---:|
| External Input | 5 |
| External Output | 0 |
| External Query | 1 |
| Internal Logical File | 0 |
| External Interface File | 0 |
| Unadjusted Function Point | 18 |
| Total Degree of Influence | 37 |
| General Characteristics Adjustment | 1,02 |
| Function Point | 18,36 |

Hasil analisis menunjukkan bahwa aplikasi merupakan sistem frontend berbasis transaksi dengan karakteristik yang sepenuhnya interaktif. Seluruh fungsi yang diidentifikasi memiliki kompleksitas Low, sehingga UFP bersumber dominan dari lima fungsi External Input dan satu fungsi External Query. Nilai Degree of Influence yang relatif tinggi (37) didominasi oleh karakteristik on-line (Data Communications, Distributed Functions, dan On-Line Data Entry), sedangkan karakteristik kinerja, konfigurasi, dan pemrosesan kompleks bernilai rendah karena aplikasi tidak memiliki logika bisnis berat dan tidak memiliki persyaratan throughput tinggi. Nilai GCA sebesar 1,02 hanya menghasilkan peningkatan kecil terhadap UFP, yang konsisten dengan sifat aplikasi frontend yang sederhana secara fungsional.

## 10. Validasi dan Keputusan Klasifikasi

### 10.1 Tabel Validasi

| No | Fungsi | Permasalahan | Keputusan | Alasan |
|---|---|---|---|---|
| 1 | Menghasilkan Kode Tiket | Kode tiket dihasilkan backend, bukan frontend | Tidak dihitung | Merupakan bagian dari transaksi Generate Tiket; frontend hanya menerima respons pada `useTicketGenerator.js` |
| 2 | Menampilkan QR Code | Berpotensi dihitung sebagai EO terpisah | Tidak dihitung terpisah | Merupakan respons dari transaksi Generate Tiket yang sama (`QRCodePreview.jsx`), bukan fungsi output yang berdiri sendiri |
| 3 | Menampilkan Informasi Tiket | Berpotensi dihitung sebagai EO terpisah | Tidak dihitung terpisah | Metadata tiket ditampilkan dalam satu keluaran transaksi Generate Tiket |
| 4 | Memilih Jenis Kendaraan | Daftar audit, tetapi tidak diimplementasikan | Tidak dihitung | `vehicleType` bersifat tetap `'mobil'` (`useTicketGenerator.js` baris 8); tidak ada input pengguna |
| 5 | Mencetak Tiket | Daftar audit, tetapi tidak diimplementasikan | Tidak dihitung | Tidak ditemukan kode pencetakan pada source code |
| 6 | Menyalin Kode Tiket | Berpotensi dihitung sebagai EO | Tidak dihitung | Mekanisme teknis clipboard (`navigator.clipboard.writeText`) tanpa pemrosesan atau data turunan |
| 7 | Pemantauan Status Tiket (Gerbang Terbuka) | Output otomatis dari peristiwa eksternal | Tidak dihitung | Mekanisme teknis sinkronisasi real-time (`onSnapshot` pada `useTicketListener.js`), bukan fungsi yang diinisiasi pengguna |
| 8 | Countdown Timer | Elemen antarmuka | Tidak dihitung | Mekanisme teknis penghitung waktu pada `useTicketGenerator.js` |
| 9 | Endpoint API | Endpoint bukan Function Point | Tidak dihitung | Endpoint hanya digunakan sebagai bukti implementasi fungsi |
| 10 | localStorage (token, user, adminAreas, selectedAreaId) | Berpotensi diklaim sebagai ILF | Tidak dihitung | Merupakan cache/sesi teknis; data bisnis dikelola sistem eksternal, tidak memenuhi definisi ILF |
| 11 | Firestore tickets | Berpotensi diklaim sebagai EIF | Tidak dihitung | Referensi Firestore merupakan mekanisme sinkronisasi; panggilan ke sistem eksternal tidak otomatis memenuhi definisi EIF |
| 12 | Generate Tiket sebagai EI + EO | Berpotensi dipecah menjadi dua fungsi | Satu EI | Proses bisnis tunggal: input parameter → proses → tiket dibuat → output ditampilkan |

### 10.2 Klasifikasi Khusus Fungsi Generate Tiket dan QR Code

Generate Tiket merupakan fungsi bisnis utama aplikasi dan dihitung sebagai satu External Input. Proses bisnisnya didefinisikan sebagai satu transaksi logis tunggal: Admin Area memasukkan parameter (areaId dan vehicleType), sistem memproses permintaan melalui `POST /gate/generateTicket`, tiket dibuat oleh backend, kemudian informasi tiket beserta QR Code ditampilkan. Pemanggilan endpoint `generateTicket` tidak dihitung sebagai Function Point tersendiri.

QR Code tidak dihitung sebagai External Output yang terpisah. Berdasarkan definisi Function Point, sebuah External Output merupakan proses elementer yang mengirim data ke luar batas aplikasi dan mengandung setidaknya satu pemrosesan turunan. Pada aplikasi ini, QR Code dirender oleh pustaka pihak ketiga (`QRCodeSVG` dari `qrcode.react`) dari nilai kode tiket yang diterima pada respons transaksi Generate Tiket, dan ditampilkan dalam satu keluaran yang sama dengan metadata tiket serta penghitung waktu pada komponen `QRCodePreview.jsx`. Keluaran tersebut merupakan respons dari transaksi Generate Tiket, sehingga seluruh elemennya merupakan satu logical transaction dan tidak dipecah menjadi beberapa fungsi hanya karena terdapat beberapa elemen antarmuka.

### 10.3 Alternatif Klasifikasi

| No | Klasifikasi Alternatif | Keputusan yang Diambil | Alasan Keputusan |
|---|---|---|---|
| 1 | Menampilkan QR Code sebagai EO Low (bobot 4) | Tidak dihitung | Klasifikasi tersebut akan menggandakan satu transaksi logis; keputusan tidak menghitungnya lebih defensibel secara metodologis karena keluaran merupakan respons EI |
| 2 | Firestore tickets sebagai EIF Low (bobot 5) | Tidak dihitung | Panggilan ke sistem eksternal (REST API maupun Firestore) tidak otomatis memenuhi definisi EIF; referensi hanya untuk sinkronisasi status |
| 3 | Menyalin Kode Tiket sebagai EO Low (bobot 4) | Tidak dihitung | Aksi menyalin tidak mengandung data turunan dan tidak mengubah perilaku sistem secara signifikan; merupakan mekanisme teknis |
| 4 | localStorage sebagai ILF Low (bobot 7) | Tidak dihitung | Data pada localStorage adalah cache teknis, bukan file logis data bisnis yang dikenali pengguna |
| 5 | Pemantauan Status Tiket sebagai EO Low (bobot 4) | Tidak dihitung | Output dihasilkan dari mekanisme sinkronisasi otomatis, bukan fungsi output bisnis yang diinisiasi pengguna |

### 10.4 Fungsi yang Tidak Dihitung dan Alasan

| No | Fungsi | Alasan Tidak Dihitung |
|---|---|---|
| 1 | Memilih Jenis Kendaraan | Tidak diimplementasikan; jenis kendaraan bersifat tetap (`useTicketGenerator.js` baris 8) |
| 2 | Mencetak Tiket | Tidak diimplementasikan; tidak ditemukan kode pencetakan pada source code |
| 3 | Menghasilkan Kode Tiket | Ditangani backend sebagai bagian transaksi Generate Tiket |
| 4 | Menampilkan QR Code | Bagian dari keluaran transaksi Generate Tiket |
| 5 | Menampilkan Informasi Tiket | Bagian dari keluaran transaksi Generate Tiket |
| 6 | Menyalin Kode Tiket | Mekanisme teknis clipboard |
| 7 | Pemantauan Status Tiket Real-Time | Mekanisme teknis sinkronisasi Firestore |
| 8 | Countdown Timer | Mekanisme teknis penghitung waktu |
| 9 | Toggle Tema, Tampilkan/Sembunyikan Kata Sandi, Guard Rute | Elemen antarmuka dan mekanisme teknis |
| 10 | Endpoint API | Hanya digunakan sebagai bukti implementasi fungsi, bukan Function Point |

Keterbatasan: klasifikasi kompleksitas seluruh fungsi sebagai Low didasarkan pada jumlah DET dan FTR yang teridentifikasi dari kode sisi klien. Karena backend REST API tidak tersedia pada repository ini, konten lengkap data area dan respons generate tiket tidak dapat diverifikasi; namun hal tersebut tidak mengubah kompleksitas yang dihasilkan karena jumlah DET yang digunakan pada pemrosesan sisi klien tetap rendah.

## 11. Kesimpulan

1. Jumlah fungsi yang berhasil diidentifikasi adalah **6 fungsi**, terdiri atas 5 fungsi External Input dan 1 fungsi External Query, seluruhnya berkompleksitas Low.
2. Nilai Unadjusted Function Point (UFP) adalah **18**.
3. Total Degree of Influence (TDI) adalah **37**.
4. Nilai General Characteristics Adjustment (GCA) adalah **1,02**.
5. Nilai Function Point akhir adalah **18,36 FP**.

Kesimpulan ini bersifat faktual dan seluruh angkanya dapat ditelusuri dari hasil audit source code pada repository `webGenerateQrcode`. Nilai Function Point sebesar 18,36 FP mencerminkan ukuran fungsional aktual aplikasi frontend kiosk generator tiket yang sederhana secara fungsional, dan dapat digunakan sebagai pembanding ukuran proyek, bukan sebagai target angka.
