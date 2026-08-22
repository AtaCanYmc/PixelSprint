# 💾 PixelSprint

> **90'lar Windows 95 ve Terminal Estetiğinde, %100 Anonim, Mobil Uyumlu ve Kurulabilir (PWA) Sprint Retrospektif Panosu.**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-008080?logo=pwa)](https://web.dev/progressive-web-apps/)

---

## 💻 Proje Hakkında (About PixelSprint)

**PixelSprint**, yazılım geliştirme ekiplerinin Sprint Sonu Retrospektif (Retro) toplantılarında kullanılmak üzere tasarlanmış nostaljik bir web uygulamasıdır. 90'ların unutulmaz Windows 95 ve klasik yesil/siyah terminal estetiğini modern web teknolojileri (Vite, TypeScript, PWA, Workbox) ile buluşturur.

- **%100 Anonimlik**: Kullanıcı kaydı veya ID takibi yapılmaz. Her karta rastgele retro kod adları verilir (`FloppyDisk-95#404`, `Agent-404#101` vb.).
- **Çevrimdışı Destek (PWA)**: İnternet bağlantısı olmadan çalışır ve cihazlara masaüstü/mobil uygulama olarak yüklenebilir.
- **Yerel Depolama (localStorage)**: Veriler tamamen kullanıcı tarayıcısında saklanır.

---

## ⭐ Öne Çıkan Özellikler

### 1. 🗔 Authentic Windows 95 UI / UX
- Win95 masaüstü mavisi (`#008080` Teal), klasik mavi-lacivert başlık çubukları ve 3D kabarık (outset) çerçeveler.
- Ekranın altında çalışan **Win95 Başlat Çubuğu (Taskbar)** ve **Başlat Menüsü (Start Menu)**.
- Web Audio API ile üretilmiş nostaljik retro **ses efektleri** (Ses Açma/Kapama düğmesiyle).

### 2. 🚀 Retro Oturum Yöneticisi (Session Dashboard) & Session ID
- **Ana Sayfa (Session Dashboard)** üzerinden yeni retro oturumları oluşturabilir veya geçmiş oturumlar arasında geçiş yapabilirsiniz.
- Her retro oturumunun benzersiz bir **Session ID**'si vardır (örn. `#session=retro-demo-sprint-1`).

### 3. 📱 QR Kod ile Hızlı Mobil Katılım
- **`Paylaş (QR)`** butonuna tıklandığında oluşturulan QR Kodu, toplantıdaki katılımcılar cep telefonu kameraları ile okutarak retro panosuna anında bağlanabilir.

### 4. ⬆️⬇️ Reddit Tarzı Upvote & Downvote (Karma Skoru)
- Kartlarda `▲ Upvote` (+1) ve `▼ Downvote` (-1) oylama sistemi.
- Pozitif skorlar yeşil, negatif skorlar kırmızı renkle vurgulanır.

### 5. 🟢🔴💡 Retrospektif Sütunları
- **🟢 Went Well**: Neyi iyi yaptık?
- **🔴 Needs Improvement**: Neyi batırdık / neleri düzeltmeliyiz?
- **💡 Action Items**: Aksiyonlar ve yeni fikirler.

### 6. 💾 Gelişmiş Rapor Dışa Aktarma (Export)
- Sprint özetinizi **.TXT**, **.CSV** (Excel uyumlu UTF-8 BOM) ve **.XLSX** (Excel XML Spreadsheet) formatlarında indirebilir veya panoya kopyalayabilirsiniz.

---

## 📁 Proje Klasör Yapısı

```
PixelSprint/
├── vite.config.ts            # Vite & VitePWA Konfigürasyonu
├── index.html                # Vite HTML Giriş Noktası
├── tsconfig.json             # TypeScript Konfigürasyonu
├── package.json              # npm Scriptleri ve Bağımlılıklar
├── LICENSE                   # Apache License 2.0
├── SECURITY.md               # Güvenlik Politikası
├── CODE_OF_CONDUCT.md        # Topluluk Kuralları
├── CONTRIBUTING.md           # Katkı Sağlama Rehberi
├── release-please-config.json # Release Please Konfigürasyonu
├── .release-please-manifest.json # Release Please Sürüm Takibi
│
├── .github/
│   ├── dependabot.yml        # Dependabot Konfigürasyonu
│   └── workflows/
│       └── release-please.yml# Release Please GitHub Action İş Akışı
│
├── public/                   # Statik İkon ve Varlıklar
│   ├── favicon.png
│   └── icons/
│
└── src/                      # TypeScript & CSS Kaynak Kodları
    ├── main.ts               # Ana Uygulama Giriş Noktası
    ├── css/                  # Modüler CSS Stilleri
    ├── types/                # TypeScript Arabirim Tanımları
    ├── core/                 # Store, Audio Synth ve PWA Katmanı
    ├── components/           # Dashboard, Board, Modal, Export, Share ve Taskbar
    └── utils/                # Sabitler ve Yardımcı Fonksiyonlar
```

---

## 🛠️ Kurulum ve Geliştirme (Development)

### 1. Depoyu Klonlayın ve Bağımlılıkları Yükleyin:
```bash
git clone https://github.com/your-org/PixelSprint.git
cd PixelSprint
npm install
```

### 2. Geliştirme Sunucusunu Başlatın (Dev Server):
```bash
npm run dev
```
Geliştirici sunucusu `http://localhost:5173` adresinde başlatılır.

### 3. Canlıya Üretim Derlemesi Alın (Production Build):
```bash
npm run build
```
Derleme çıktısı `dist/` klasöründe oluşur.

### 4. Üretim Derlemesini Önizleyin:
```bash
npm run preview
```

---

## 📜 Lisans

Bu proje **[Apache License 2.0](LICENSE)** altında lisanslanmıştır.
