import doyanayam1 from "@/assets/project/doyanayam1.png";
import doyanayam2 from "@/assets/project/doyanayam2.png";
import doyanayam3 from "@/assets/project/doyanayam3.png";
import doyanayam4 from "@/assets/project/doyanayam4.png";
import academic from "@/assets/project/academic.png";
import academic2 from "@/assets/project/academic2.png";
import academic3 from "@/assets/project/academic3.png";
import academic4 from "@/assets/project/academic4.png";
import academic5 from "@/assets/project/academic5.png";
import smartmoney1 from "@/assets/project/smartmoney1.png";
import smartmoney2 from "@/assets/project/smartmoney2.png";
import smartmoney3 from "@/assets/project/smartmoney3.png";
import smartmoney4 from "@/assets/project/smartmoney4.png";
import smartmoney5 from "@/assets/project/smartmoney5.png";
import smartmoney6 from "@/assets/project/smartmoney6.png";
import japanman1 from "@/assets/project/japanman1.png";
import japanman2 from "@/assets/project/japanman2.png";
import japanman3 from "@/assets/project/japanman3.png";
import japanman4 from "@/assets/project/japanman4.png";
import smarthold1 from "@/assets/project/smarthold1.png";
import smarthold2 from "@/assets/project/smarthold2.png";
import smarthold3 from "@/assets/project/smarthold3.png";
import smarthold4 from "@/assets/project/smarthold4.png";
import sewakendaraan from "@/assets/project/sewakendaraan.png";
import chatbot from "@/assets/project/chatbot.png";

const projects = [
  {
    id: 7,
    slug: "doyan-ayam-ui-ux-redesign",
    title: "Doyan Ayam Website Redesign",
    description:
      "Desain antarmuka website untuk restoran dan franchise Doyan Ayam, dengan fokus pada halaman menu produk, penawaran kemitraan, dan pusat bantuan kontak.",
    image: doyanayam1,
    imageRatio: "landscape",
    tags: ["UI/UX Design", "Website", "F&B"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    detail: {
      overview:
        "Proyek ini merupakan rancangan antarmuka (UI) untuk website Doyan Ayam. Desain ini mencakup Halaman Katalog Menu yang menampilkan pilihan makanan dengan harga yang jelas. Terdapat juga Halaman Detail Menu yang lebih komprehensif, menampilkan profil rasa, tingkat kepedasan, serta informasi nilai gizi produk. Untuk keperluan bisnis, dirancang Halaman Franchise yang menyajikan alur pendaftaran kemitraan dan rincian harga paket. Selain itu, terdapat Halaman Kontak yang dirancang untuk merutekan pengguna ke layanan yang tepat, seperti customer service, pusat keluhan, atau pemesanan besar.",
      techStack: [{ name: "Figma", icon: "figma" }],
      features: [
        "Halaman Katalog Menu dengan harga yang jelas",
        "Halaman Detail Menu dengan profil rasa dan nilai gizi",
        "Halaman Franchise dengan alur pendaftaran kemitraan",
        "Halaman Kontak dengan routing ke layanan yang tepat",
      ],
      screenshots: [doyanayam1, doyanayam2, doyanayam3, doyanayam4],
    },
  },

  {
    id: 1,
    slug: "academic-atelier",
    title: "Academic Atelier — ComStudyApp",
    description:
      "Community learning platform mobile app dengan Flutter frontend dan Node.js/Express/MongoDB backend. User bisa mengikuti kursus, diskusi komunitas, meetups, dan quiz evaluasi.",
    image: academic,
    imageRatio: "portrait",
    tags: ["Flutter", "Dart", "Node.js", "Express", "MongoDB"],
    demoUrl: "#",
    githubUrl: "https://github.com/AFCS667/comstudyapp",
    featured: false,
    detail: {
      overview:
        "Academic Atelier (ComStudyApp) adalah platform pembelajaran berbasis komunitas yang dirancang mobile-first. Aplikasi ini memiliki 4 tab utama: Dashboard, Courses, Community, dan Meetups. Fitur lengkap mencakup autentikasi JWT dengan session manager (7-day expiry), onboarding 3 halaman, kursus dengan progress tracking per lesson, forum diskusi Q&A, discovery meetup dengan map, dan sistem quiz evaluasi. UI menggunakan Material 3 (Material Design 3) dengan design system terpusat (30+ color tokens). Navigasi menggunakan IndexedStack dengan custom bottom navigation bar.",
      techStack: [
        { name: "Flutter", icon: "flutter" },
        { name: "Dart", icon: "dart" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Express.js", icon: "express" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "JWT", icon: "jwt" },
      ],
      challenges:
        "Tantangan utama adalah mengimplementasikan JWT session manager dengan auto-expiry (7 hari) menggunakan SharedPreferences, membangun design system konsisten dengan Material 3 yang mendefinisikan 30+ named color tokens digunakan di seluruh 14+ screen, membangun course detail screen dengan video player area dan tabbed interface (Materials/About/Forum) dengan lesson-by-lesson breakdown berisi 3 state (completed/active/locked), membangun community forum dengan filter system dan nested reply threads dengan tag system dan markdown support, mengimplementasikan quiz evaluation system dengan timer dan scoring client-side, serta membangun full auth flow dari register + login dengan form validation dan password hashing.",
      features: [
        "JWT authentication dengan session manager (7-day auto-expiry)",
        "4 tab utama: Dashboard, Courses, Community, Meetups",
        "Course progress tracking per lesson dengan 3 state",
        "Community forum Q&A dengan filter dan nested replies",
        "Discovery meetup dengan map integration",
        "Quiz evaluation system dengan timer dan scoring",
        "Material 3 design system dengan 30+ color tokens",
      ],
      screenshots: [academic, academic2, academic3, academic4, academic5],
    },
  },

  {
    id: 2,
    slug: "smart-money",
    title: "Smart Money",
    description:
      "Aplikasi personal finance tracker untuk mencatat, mengelola, dan menganalisis pemasukan serta pengeluaran secara sederhana dan fleksibel. Mendukung multi-metode pembayaran, kategori custom, wishlist, dan insight keuangan.",
    image: smartmoney1,
    imageRatio: "portrait",
    tags: ["Flutter", "Supabase", "PostgreSQL", "Riverpod", "fl_chart"],
    demoUrl: "#",
    githubUrl: "https://github.com/ibayers/Smart-Money",
    featured: false,
    detail: {
      overview:
        'Smart Money adalah aplikasi mobile (Android & iOS) yang dibangun dengan Flutter untuk membantu pengguna mencatat transaksi harian, mengelola kategori dan metode pembayaran, melihat laporan keuangan (summary + history), serta menyimpan wishlist barang yang ingin dibeli. Aplikasi ini menggunakan Supabase sebagai backend (Auth, PostgreSQL, Storage) dan Riverpod untuk state management dengan clean architecture (domain/data/presentation layers). Design system yang digunakan bernama "The Serene Ledger" — menerapkan organic minimalist layering dengan tonal stacking, glassmorphism pada bottom navigation dan modal, serta palette Deep Teal ke Mint untuk kesan premium dan breathable.',
      techStack: [
        { name: "Flutter", icon: "flutter" },
        { name: "Dart", icon: "dart" },
        { name: "Supabase", icon: "supabase" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Riverpod", icon: "riverpod" },
        { name: "fl_chart", icon: "chart" },
      ],
      challenges:
        "Tantangan utama adalah mendesain UX input transaksi yang super cepat (maksimal 3-4 tap) agar user konsisten mencatat pengeluaran tanpa friction, mengintegrasikan Supabase Auth dengan Row Level Security (RLS) sehingga setiap user hanya bisa mengakses data miliknya sendiri, mengimplementasikan clean architecture (domain/data/presentation) dengan repository pattern agar kode testable dan backend-agnostic, membangun design system The Serene Ledger dengan tonal layering dan glassmorphism, menangani multiple payment methods (Cash, GoPay, OVO, Bank Transfer, Credit Card) dan kategori custom per user dengan JOIN query yang efisien, serta mengelola state async yang kompleks untuk 5 entity berbeda menggunakan Riverpod AsyncNotifier.",
      features: [
        "Multi payment methods: Cash, GoPay, OVO, Bank Transfer, Credit Card",
        "Custom categories per user",
        "Financial reports: summary + history dengan pie chart dan grafik tren",
        "Wishlist dengan photo upload",
        "Supabase Auth + Row Level Security",
        'Design system "The Serene Ledger" dengan glassmorphism',
        "Clean architecture (domain/data/presentation layers)",
      ],
      screenshots: [
        smartmoney1,
        smartmoney2,
        smartmoney3,
        smartmoney4,
        smartmoney5,
        smartmoney6,
      ],
    },
  },

  {
    id: 3,
    slug: "japan-man-food-ordering",
    title: "Japan Man - Sushi & Japanese Food Ordering App",
    description:
      "A Flutter-based Japanese food ordering application featuring a restaurant menu with food items, interactive menu page with horizontal scrolling food tiles, promo banners, search functionality, and a detail/checkout flow.",
    image: japanman1,
    imageRatio: "portrait",
    tags: ["Flutter", "Dart", "Mobile App", "UI/UX"],
    demoUrl: "#",
    githubUrl: "https://github.com/bryancarlos/sushi",
    featured: false,
    detail: {
      overview:
        "Japan Man is a Flutter mobile application designed as a Japanese restaurant food ordering system. The app opens with an intro/splash page branding 'JAPAN MAN' with a 'Get Started' button that navigates to the main menu. The menu page displays a promo banner (32% discount), a search bar, a horizontally scrollable food menu list, and a popular food section. Users can tap on food items to view details on a dedicated detail page, then proceed to checkout. The app uses a warm red/maroon color scheme to evoke a Japanese restaurant aesthetic.",
      techStack: [
        { name: "Flutter", icon: "flutter" },
        { name: "Dart", icon: "dart" },
        { name: "google_fonts", icon: "google" },
        { name: "Material Design", icon: "material" },
      ],
      challenges:
        "Tantangan utama adalah membangun horizontal scrolling food menu list yang smooth dan responsive, mendesain UI dengan warm red/maroon color scheme yang konsisten untuk Japanese restaurant aesthetic, mengimplementasikan splash/intro page dengan branding dan navigasi ke main menu, membangun food detail page dengan layout yang menampilkan informasi item secara jelas, serta membuat promo banner yang eye-catching di menu page.",
      features: [
        "Intro/splash page dengan branding JAPAN MAN",
        "Interactive menu page dengan horizontal scrolling food tiles",
        "Promo banner (32% discount)",
        "Search functionality untuk food items",
        "Food detail page dengan checkout flow",
        "Warm red/maroon color scheme Japanese aesthetic",
      ],
      screenshots: [japanman1, japanman3, japanman4],
    },
  },

  {
    id: 4,
    slug: "smarthold",
    title: "SmartHold - Secure Automated Shopping",
    description:
      "Platform belanja otomatis berbasis IoT dengan sistem pembayaran SmartHold (hold +15%, capture, release). Terintegrasi Supabase Auth, QR code entry/exit, real-time cart monitoring via Python backend, dan risk assessment AI.",
    image: smarthold1,
    imageRatio: "portrait",
    tags: ["React", "Supabase", "TypeScript", "Tailwind CSS", "Python Flask"],
    demoUrl: "#",
    githubUrl: "https://github.com/mmvergara/react-supabase-auth-template",
    featured: false,
    detail: {
      overview:
        "SmartHold adalah sistem belanja toko otomatis. User login via Supabase Auth, masuk toko dengan QR entry, pair dengan Smart Cart via QR scanner, belanja real-time dengan monitoring risk score (Green/Yellow/Red), checkout dengan settlement otomatis (hold 115% → capture → release selisih), dan keluar dengan QR exit. Semua data transaksi dan saldo tersimpan di Supabase.",
      techStack: [
        { name: "React", icon: "react" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Supabase", icon: "supabase" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Python Flask", icon: "python" },
        { name: "QR Code", icon: "qrcode" },
      ],
      challenges:
        "Tantangan utama adalah melakukan polling real-time ke Python backend setiap 1 detik tanpa WebSocket, membangun sistem risk assessment 3 level (Green/Yellow/Red) dengan UI dinamis dan auto-capture, mencegah double insert transaksi di React Strict Mode dengan useRef guard, mengimplementasikan perhitungan settlement dinamis (hold 115%, capture, release) dengan format Rupiah, mengelola deep link navigasi dengan hash scroll antar halaman, serta menangani side effect multi-step di Smart Receipt (insert transactions + update balance).",
      features: [
        "Supabase Auth untuk login/register",
        "QR code entry/exit system",
        "Real-time cart monitoring via Python backend",
        "Risk assessment 3 level (Green/Yellow/Red)",
        "Settlement otomatis (hold 115% → capture → release)",
        "Smart Receipt dengan multi-step transaction",
      ],
      screenshots: [smarthold1, smarthold2, smarthold3, smarthold4],
    },
  },

  {
    id: 5,
    slug: "sewa-kendaraan-luxeride",
    title: "Sewa Kendaraan - LuxeRide",
    description:
      "Landing page vehicle rental berbasis React dengan animasi scroll, carousel kendaraan, testimoni pelanggan, dan integrasi contact form via Web3Forms.",
    image: sewakendaraan,
    imageRatio: "landscape",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    detail: {
      overview:
        "Website sewa kendaraan bermerek LuxeRide. Single-page app dengan section: Hero, About, Project (carousel 6 kendaraan), Testimoni, Contact (Web3Forms), dan Footer. Dibangun dengan React 19, Vite 7, Tailwind CSS 4, dan Framer Motion untuk animasi scroll.",
      techStack: [
        { name: "React", icon: "react" },
        { name: "Vite", icon: "vite" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Framer Motion", icon: "framer" },
      ],
      challenges:
        "Tantangan utama adalah membangun landing page yang responsive dengan animasi scroll yang smooth di semua section, mengimplementasikan carousel kendaraan dengan Framer Motion, mengintegrasikan contact form dengan Web3Forms API, serta mendesain UI yang premium untuk rental kendaraan mewah.",
      features: [
        "Hero section dengan animasi scroll",
        "Carousel 6 kendaraan",
        "Testimoni pelanggan",
        "Contact form via Web3Forms",
        "Responsive design semua breakpoint",
        "Dark/light mode",
      ],
      screenshots: [sewakendaraan],
    },
  },

  {
    id: 6,
    slug: "maju-bareng",
    title: "Maju Bareng - Gemini AI Chatbot",
    description:
      "Full-stack chatbot application yang mengintegrasikan Google Gemini AI untuk text generation dan image/document analysis. Backend Express.js menerima prompt teks maupun file gambar untuk dianalisis oleh model Gemini 2.5 Flash Lite.",
    image: chatbot,
    imageRatio: "landscape",
    tags: ["Express.js", "Google Gemini AI", "Node.js", "Chatbot"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    detail: {
      overview:
        "Maju Bareng adalah aplikasi chatbot berbasis web yang memanfaatkan Google Gemini AI (model gemini-2.5-flash-lite) untuk menghasilkan respons teks dan menganalisis gambar/dokumen. Proyek ini memiliki arsitektur sederhana: backend Express.js (ESM) pada port 3000 dengan dua endpoint utama — POST /generate-text untuk text generation dan POST /generate-from-image untuk multimodal analysis menggunakan multer sebagai file upload middleware. Frontend berupa antarmuka chat sederhana (HTML/CSS/JS vanilla) yang terhubung ke backend.",
      techStack: [
        { name: "Express.js", icon: "express" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Google Gemini AI", icon: "gemini" },
        { name: "Multer", icon: "upload" },
        { name: "Vanilla JS", icon: "javascript" },
      ],
      challenges:
        "Tantangan utama adalah mengintegrasikan Google Gemini AI SDK dengan endpoint multimodal (teks + gambar base64 inline), menangani file upload menggunakan Multer dan konversi ke base64 untuk dikirim ke Gemini API, membangun frontend chat UI yang terhubung ke backend, serta mengelola environment variables untuk API key secara aman.",
      features: [
        "Text generation via Gemini 2.5 Flash Lite",
        "Image/document analysis multimodal",
        "File upload dengan Multer middleware",
        "Dual endpoint: text dan image analysis",
        "ES Modules architecture",
        "Frontend chat UI vanilla HTML/CSS/JS",
      ],
      screenshots: [chatbot],
    },
  },
];

export default projects;
