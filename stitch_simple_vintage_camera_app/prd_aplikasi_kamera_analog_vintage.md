# PRD: Aplikasi Kamera Analog Vintage

Nov 2, 2026 · @Duwi

## 1. Ringkasan Eksekutif

Produk ini adalah aplikasi kamera mobile yang membuat siapa pun bisa merasakan hasil foto dan video dari puluhan kamera film klasik tanpa membeli perangkat aslinya. Nama aplikasi masih berupa nama kerja (*working title*) dan perlu diputuskan sebelum rilis.

**Masalah.** Kamera film, instan, CCD, dan sekali pakai makin mahal dan sulit ditemukan. Biaya roll film dan cetak juga membuat orang ragu bereksperimen. Aplikasi filter yang ada umumnya hanya menempelkan satu preset warna, sehingga hasilnya tidak terasa seperti kamera aslinya.

**Solusi.** Setiap kamera di aplikasi ini adalah satu paket utuh: warna, grain, karakter lensa, bingkai, dan efek khas, ditambah satu elemen kejutan di setiap jepretan (misalnya cahaya bocor atau bingkai yang berbeda tiap kali). Pengguna bisa memotret langsung, merekam video, atau mengimpor foto lama.

**Nilai utama bagi pengguna:**

- Pilihan banyak: 14 kamera di rilis awal, dengan kamera baru ditambahkan berkala.
- Pratinjau langsung, jadi hasil akhir terlihat sebelum menjepret.
- Setiap kamera punya cerita, palet warna, dan tips pemotretan di halaman pratinjaunya.
- Kontrol manual (eksposur, fokus, white balance, rasio, flash) dan efek kreatif (cap waktu, light leak, goresan, bingkai) untuk gaya pribadi.

**Platform awal yang diusulkan:** iOS dan Android (asumsi; lihat Pertanyaan Terbuka di bagian 8).

## 2. Tujuan, Metrik, dan Non-Tujuan

Rilis awal berhasil jika pengguna cepat menemukan kamera favorit, sering memotret, dan membagikan hasilnya. Angka target di bawah adalah usulan awal dan perlu disesuaikan dengan anggaran serta data pasar Anda.

### Tujuan produk

1. Memberi pengalaman yang terasa autentik per kamera, bukan sekadar filter warna.
2. Menjaga alur dari buka aplikasi sampai jepretan pertama di bawah 10 detik.
3. Membuat pengguna ingin mengoleksi dan mencoba banyak kamera.
4. Membuat hasil mudah dibagikan ke media sosial.

### Metrik keberhasilan (usulan)

| Metrik | Definisi | Target 90 hari setelah rilis |
| --- | --- | --- |
| Aktivasi | Pengguna yang mengambil atau mengimpor foto pertama dalam sesi pertama | 70% |
| Retensi D7 | Pengguna aktif kembali pada hari ke-7 | 20% |
| Kamera dicoba | Rata-rata kamera berbeda yang dipakai per pengguna aktif per minggu | 4 |
| Rasio bagikan | Foto atau video yang dibagikan dari total hasil tersimpan | 25% |
| Stabilitas | Sesi bebas crash | 99,5% |
| Rating toko aplikasi | Rata-rata rating | 4,5 atau lebih |

### Non-tujuan (rilis 1.0)

- Bukan editor foto lengkap (tidak ada layer, retouch, atau penghapus objek).
- Bukan jejaring sosial; berbagi lewat menu bagikan bawaan sistem.
- Tidak menyediakan cetak fisik atau pemesanan film asli.
- Tidak ada fitur AI generatif; semua efek berbasis pemrosesan gambar deterministik.

## 3. Target Pengguna

Pengguna utama adalah penyuka fotografi berusia sekitar 16 sampai 35 tahun yang menyukai tampilan nostalgia tetapi tidak mau membeli atau merawat kamera film. Tiga persona berikut memandu prioritas fitur.

| Persona | Kebutuhan | Fitur yang paling penting |
| --- | --- | --- |
| Pemula kreatif (pelajar/mahasiswa, aktif di media sosial) | Hasil bagus tanpa belajar teknis, mudah dibagikan | Pratinjau langsung, satu ketukan ganti kamera, bingkai dan cap waktu |
| Penyuka kamera retro (kolektor, penggemar film) | Karakter kamera yang akurat dan bisa dikontrol | Kontrol manual, halaman cerita kamera, koleksi favorit |
| Pembuat konten (kreator video pendek, UMKM yang butuh visual khas) | Konten bergaya vintage yang konsisten dan cepat dibuat | Mode video (DV, Slide), impor foto, rasio aspek, ekspor kualitas tinggi |

**Pasar awal:** Indonesia, dengan bahasa Indonesia dan Inggris sejak rilis pertama (asumsi).

## 4. Katalog Kamera Rilis Awal

Rilis 1.0 memuat 14 kamera berikut. Setiap kamera wajib punya: ikon, palet warna, profil efek default, halaman pratinjau (cerita, inspirasi, tips), dan skenario pemotretan yang disarankan. Kolom "Elemen kejutan" adalah usulan agar setiap jepretan terasa berbeda; tim desain dapat mengubahnya.

| Kode | Kategori | Inspirasi | Karakter visual | Elemen kejutan (usulan) | Skenario yang disarankan |
| --- | --- | --- | --- | --- | --- |
| GRN | Kompak digital | Mode negatif Ricoh GR | Nuansa biru lembut dan elegan | Variasi tint biru tiap jepretan | Jalanan kota, arsitektur |
| K Funs | Sekali pakai | Kodak FunSaver | Warna kuat, vintage | Flash keras dan cahaya bocor acak | Pesta, jalan-jalan |
| FC 100 | Film negatif | Fujicolor 100 | Warna ikonik, bersih | Grain halus bervariasi | Foto sehari-hari, di luar ruangan |
| Inst M | Instan | Instax Mini | Cetakan instan dengan bingkai putih | Animasi "cetak" dan efek develop | Potret teman, momen spontan |
| H 500C | Format medium | Hasselblad 500C | Warna kalem, klasik | Vinyet dan ketajaman bervariasi | Potret, still life |
| FQS | Sekali pakai | Fujifilm QuickSnap 1986 | Tekstur khas kamera sekali pakai | Pergeseran warna dan debu | Acara keluarga, liburan |
| CCD | Digital CCD | Sensor CCD era 2000-an | Tajam dengan fokus lembut, nostalgia digital | Noise dan blooming highlight | Selfie, malam hari dengan flash |
| H Glow | Kamera mainan | Holga | Lo-fi lensa plastik, bingkai unik | Bentuk vinyet dan kebocoran cahaya acak | Eksperimen, suasana mimpi |
| Pola N | Instan | Polaroid Now | Warna hangat dan natural | Bingkai dan kecerahan bervariasi | Potret, makanan, kafe |
| DV | Video | Kamera DV klasik | Terasa seperti film rumah lama | Gangguan garis, tanggal REC | Video keseharian, perjalanan |
| LM | Rangefinder | Leica M | Cahaya dan bayangan dramatis | Kontras mikro bervariasi | Fotografi jalanan, hitam putih |
| RZ 67 | Format medium | Mamiya RZ67 | Adegan biasa jadi artistik | Kedalaman bidang fokus lembut | Potret artistik, mode |
| Slide | Proyektor slide | Slide film dan proyektor | Warna jenuh, gaya proyeksi | Kilau proyektor dan bingkai slide | Kenangan, perjalanan |
| FN 1600 | Film cepat | Fujifilm Natura 1600 | Tampilan film ISO tinggi | Grain berat dan warna hangat | Dalam ruangan, cahaya redup |

**Katalog akan bertambah.** Arsitektur harus memungkinkan kamera baru ditambahkan lewat paket konfigurasi tanpa memperbarui aplikasi di toko (lihat bagian 7).

**Catatan merek dagang.** Nama seperti Ricoh GR, Kodak FunSaver, Instax, Hasselblad, Polaroid, Leica, Holga, Mamiya, dan Fujifilm adalah merek dagang pihak lain. Di dalam aplikasi dan materi pemasaran, pakai nama sendiri (misalnya GRN, K Funs) dan kalimat seperti "terinspirasi dari" saja setelah ditinjau penasihat hukum. Jangan memakai logo, desain bodi, atau nama produk lengkap tanpa izin.

## 5. Kebutuhan Fungsional

Prioritas memakai skala P0 (wajib di rilis 1.0), P1 (diharapkan di 1.0, boleh menyusul di 1.1), dan P2 (setelah 1.1).

### 5.1 Kamera dan pengambilan gambar

| ID | Kebutuhan | Kriteria penerimaan | Prioritas |
| --- | --- | --- | --- |
| F-01 | Pemotretan foto dengan kamera terpilih | Efek kamera diterapkan ke hasil akhir yang identik dengan pratinjau | P0 |
| F-02 | Pratinjau langsung (live preview) | Pratinjau berjalan minimal 30 fps di perangkat kelas menengah dan menampilkan warna, grain, serta bingkai kamera | P0 |
| F-03 | Elemen kejutan per jepretan | Variasi efek acak (misalnya light leak, bingkai) diterapkan saat jepretan; pengguna dapat mematikannya di pengaturan | P0 |
| F-04 | Perekaman video | Video dengan efek kamera; durasi minimal 60 detik; audio ikut terekam | P0 |
| F-05 | Timer | Pilihan 3, 5, dan 10 detik dengan hitung mundur terlihat | P0 |
| F-06 | Balik dan cermin | Pilihan kamera depan/belakang dan opsi cermin pada hasil | P0 |
| F-07 | Pengaturan kamera | Eksposur, panjang fokus (zoom), white balance, rasio aspek, dan flash dapat diatur; nilai tersimpan per kamera | P0 |
| F-08 | Pemotretan beruntun dan hasil instan | Animasi khusus (misalnya cetak Instan) tidak menghalangi jepretan berikutnya lebih dari 1 detik | P1 |

### 5.2 Katalog, koleksi, dan halaman kamera

| ID | Kebutuhan | Kriteria penerimaan | Prioritas |
| --- | --- | --- | --- |
| F-10 | Daftar kamera dengan pencarian dan kategori | Pengguna bisa ganti kamera maksimal dua ketukan dari layar kamera | P0 |
| F-11 | Halaman pratinjau kamera | Menampilkan cerita, inspirasi, palet warna, tips pemotretan, dan contoh hasil | P0 |
| F-12 | Koleksi dan favorit | Pengguna dapat menandai, mengurutkan, dan menyembunyikan kamera; tersimpan di perangkat | P0 |
| F-13 | Kamera baru tanpa pembaruan aplikasi | Kamera baru muncul lewat unduhan paket konfigurasi | P1 |

### 5.3 Efek kreatif

| ID | Kebutuhan | Kriteria penerimaan | Prioritas |
| --- | --- | --- | --- |
| F-20 | Cap waktu (date stamp) | Format dan warna dapat dipilih; mengikuti tanggal pengambilan | P0 |
| F-21 | Light leak, flare, noise, goresan, debu | Intensitas dapat diatur 0 sampai 100% per efek | P0 |
| F-22 | Bingkai kreatif | Minimal 10 bingkai di rilis 1.0, termasuk bingkai khas Instan dan slide | P0 |
| F-23 | Efek bintang dan coretan animasi | Berlaku untuk foto dan video, dapat dimatikan | P1 |

### 5.4 Impor, penyimpanan, dan berbagi

| ID | Kebutuhan | Kriteria penerimaan | Prioritas |
| --- | --- | --- | --- |
| F-30 | Impor foto dan video dari galeri | Filter kamera dan efek dapat diterapkan serta diganti setelah impor | P0 |
| F-31 | Simpan ke galeri | Resolusi asli perangkat dipertahankan, metadata dasar tersimpan | P0 |
| F-32 | Bagikan | Menu bagikan bawaan sistem; opsi tanpa watermark untuk pengguna berbayar | P0 |
| F-33 | Edit ulang hasil | Pengguna dapat membuka hasil tersimpan dan mengganti kamera atau efek | P1 |

## 6. Alur Pengguna dan UI/UX

Pengalaman utama berpusat pada layar kamera: pengguna harus bisa memotret dalam hitungan detik, lalu memperdalam lewat koleksi dan pengaturan bila mau.

### Alur utama: memotret

1. Buka aplikasi dan langsung masuk ke layar kamera dengan kamera terakhir yang dipakai.
2. Geser atau ketuk pemilih kamera untuk berganti; pratinjau langsung berubah seketika.
3. (Opsional) Atur eksposur, zoom, white balance, rasio, flash, timer, atau efek kreatif.
4. Ketuk tombol rana untuk foto, atau tahan/ganti mode untuk video.
5. Hasil muncul dengan animasi khas kamera, lalu tersimpan ke galeri.
6. Bagikan, edit ulang dengan kamera lain, atau lanjut memotret.

### Alur impor

1. Pilih Impor dari layar kamera atau beranda.
2. Pilih foto atau video dari galeri.
3. Pilih kamera dan efek; lihat hasil langsung.
4. Simpan atau bagikan.

### Alur menjelajah kamera

1. Buka Koleksi dan telusuri berdasarkan kategori (instan, CCD, sekali pakai, mainan, slide, dan lain-lain).
2. Buka halaman pratinjau kamera: baca cerita, lihat inspirasi dan contoh hasil, baca tips.
3. Ketuk Pakai kamera ini atau tandai sebagai favorit.

### Prinsip desain

- **Layar kamera dulu.** Tidak ada layar pembuka panjang atau pendaftaran akun wajib sebelum jepretan pertama.
- **Terasa seperti kamera fisik.** Animasi, suara rana, dan haptic khas tiap kamera (dapat dimatikan).
- **Kontrol bertahap.** Pengaturan lanjutan tersembunyi di panel yang bisa dibuka; tampilan default bersih.
- **Aksesibel.** Teks mengikuti ukuran font sistem, kontras memadai, dan tombol utama dapat dijangkau satu tangan.
- **Dua bahasa.** Bahasa Indonesia dan Inggris sejak rilis awal.

## 7. Non-Fungsional, Arsitektur, dan Risiko

Kualitas efek dan kecepatan pratinjau adalah syarat utama; pengguna akan langsung meninggalkan aplikasi jika pratinjau patah-patah atau hasil berbeda dari yang terlihat.

### 7.1 Kebutuhan non-fungsional

| Area | Kebutuhan |
| --- | --- |
| Kinerja | Pratinjau minimal 30 fps pada perangkat kelas menengah; waktu proses foto di bawah 1 detik; proses video berjalan real-time |
| Kualitas | Hasil akhir identik dengan pratinjau (WYSIWYG); resolusi keluaran mengikuti sensor perangkat |
| Efisiensi | Pemrosesan di GPU; suhu dan baterai terkendali pada perekaman video 5 menit |
| Ukuran | Ukuran unduhan awal di bawah 150 MB; aset kamera tambahan diunduh sesuai kebutuhan |
| Privasi | Foto diproses di perangkat dan tidak diunggah; izin kamera, mikrofon, dan galeri diminta saat dibutuhkan; kepatuhan UU Pelindungan Data Pribadi (UU PDP) |
| Luring | Semua kamera yang sudah diunduh bekerja tanpa internet |
| Kompatibilitas | iOS dan Android versi yang mencakup minimal 90% perangkat aktif di Indonesia (angka usulan; perlu dicek dengan data pasar) |

### 7.2 Arsitektur teknis (usulan)

- **Mesin efek berbasis GPU** (Metal di iOS, Vulkan/OpenGL ES di Android, atau lapisan lintas platform) memproses setiap bingkai pratinjau, foto, dan video.
- **Profil kamera sebagai data.** Setiap kamera didefinisikan oleh berkas konfigurasi (kurva warna, LUT, grain, vinyet, bingkai, efek acak, animasi). Ini memungkinkan kamera baru ditambahkan tanpa rilis aplikasi dan memudahkan tim desain menyetel hasilnya.
- **Penyimpanan lokal** untuk koleksi, favorit, dan pengaturan per kamera; akun dan sinkronisasi awan tidak wajib di rilis 1.0.
- **Pengiriman aset** lewat CDN untuk paket kamera dan bingkai tambahan.
- **Analitik dan laporan crash** dengan data anonim dan persetujuan pengguna.

### 7.3 Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Efek terlihat "hanya filter" dan tidak otentik | Retensi rendah | Rujukan hasil film asli per kamera, uji buta dengan penggemar kamera retro, dan setel profil bersama fotografer |
| Pratinjau berat di perangkat murah | Ulasan buruk | Mode kualitas pratinjau adaptif, uji di perangkat kelas bawah sejak awal |
| Sengketa merek dagang pada nama dan ikon kamera | Penolakan toko aplikasi atau tuntutan | Nama orisinal, tanpa logo atau desain bodi asli, tinjauan hukum sebelum rilis |
| Perekaman video terlalu panas atau boros baterai | Aplikasi ditinggalkan | Batasi resolusi efek berat, optimalkan shader, uji sesi video 5 menit |
| Terlalu banyak kamera membuat pengguna bingung | Aktivasi rendah | Kamera rekomendasi di awal, kategori jelas, dan kamera default yang bagus |
| Persaingan dengan aplikasi retro yang sudah mapan | Akuisisi mahal | Diferensiasi lewat kejutan per jepretan, cerita kamera, dan kualitas video |

## 8. Rencana Rilis, Monetisasi, dan Pertanyaan Terbuka

Rilis 1.0 dibuka setelah tiga gerbang kualitas lolos; tanggal target belum ditetapkan dan perlu disusun bersama tim teknis.

&#91;embedded content: peta jalan rilis · 4 fase, 3 gerbang\]

Fase berjalan berurutan dan tidak digambar sesuai skala waktu; setiap gerbang harus lolos sebelum fase berikutnya dimulai.

### Monetisasi (usulan)

- Gratis dengan sebagian kamera dasar dan watermark kecil pada hasil.
- Langganan atau pembelian sekali bayar untuk semua kamera, tanpa watermark, dan ekspor kualitas penuh.
- Paket kamera tambahan sebagai pembelian terpisah (opsional).

### Analitik

Peristiwa yang dicatat secara anonim dan dengan persetujuan pengguna: kamera dipilih, foto diambil, video direkam, impor, bagikan, kamera difavoritkan, dan efek diubah. Data ini dipakai untuk mengukur metrik di bagian 2.

### Pertanyaan terbuka

- [ ] Apa nama aplikasi dan identitas visualnya?
- [ ] Platform pertama: iOS, Android, atau keduanya bersamaan?
- [ ] Model monetisasi mana yang dipilih: langganan, beli putus, atau berbasis iklan?
- [ ] Apakah akun pengguna dan sinkronisasi awan diperlukan sejak 1.0?
- [ ] Berapa anggaran, ukuran tim, dan tanggal target rilis?
- [ ] Siapa yang menyetel profil warna tiap kamera: fotografer internal atau mitra?
