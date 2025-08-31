### Folder Structure

```
├── App.tsx                    # Komponen root aplikasi, navigasi utama, provider global
├── assets/                    # Gambar, font, ikon, dll.
│   ├── fonts/
│   ├── icons/
│   └── images/
│       └── background.png
│       └── LogoSplashScreen.png
│       └── login-logo.png
├── components/                # Komponen UI reusable (atom/molekul) yang tidak terikat pada screen tertentu
│   ├── ui/                    # Komponen UI dasar (Button, Input, Card, dll.)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layout/                # Komponen layout umum (BackgroundLayout, Container, dll.)
│   │   ├── BackgroundLayout.tsx
│   │   └── Container.tsx
│   └── LoadingSplash.tsx      # Komponen splash screen awal aplikasi
│   └── EditScreenInfo.tsx     # Contoh komponen utilitas screen
├── constants/                 # Konstanta global (warna, ukuran, dll.)
│   └── Colors.ts
├── context/                   # Context API untuk state global (seperti AuthContext)
│   └── AuthContext.tsx        # Context untuk autentikasi dan sesi pengguna
├── navigation/                # Definisi navigasi (stack, tabs, dll.)
│   └── index.tsx              # Root navigator Anda
├── screens/                   # Komponen layar/halaman utama aplikasi
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   └── AboutScreen.tsx
├── hooks/                     # Custom hooks untuk logika reusable (misal: useAuth jika tidak pakai Context)
│   └── useAuth.ts             # (Jika Anda tidak membuat AuthContext, ini bisa jadi tempatnya)
├── services/                  # Logika interaksi dengan API eksternal
│   └── api.ts                 # Instance Axios dengan interceptor token
│   └── auth.ts                # Fungsi untuk save/load/clear token dari AsyncStorage
├── types/                     # Definisi tipe TypeScript global atau umum
│   ├── navigation.ts          # (Jika ada tipe navigasi yang lebih kompleks)
│   └── auth.ts                # (Definisi tipe untuk UserSession, DecodedToken, dll.)
├── utils/                     # Fungsi utilitas umum, helpers (format date, dll.)
│   └── auth.ts                # Fungsi untuk save/load/clear token dari AsyncStorage (saya pindahkan kesini)
├── global.css                 # Import Tailwind/NativeWind
├── tailwind.config.js         # Konfigurasi Tailwind CSS
├── tsconfig.json              # Konfigurasi TypeScript
├── package.json               # Daftar dependensi dan script
├── package-lock.json          # Lock file dependensi
├── .gitignore                 # File yang diabaikan Git
├── metro.config.js            # Konfigurasi Metro bundler
├── babel.config.js            # Konfigurasi Babel
└── prettier.config.js         # Konfigurasi Prettier
```
