import cert1 from "@/assets/1.png";
import cert2 from "@/assets/2.png";
import cert3 from "@/assets/3.png";
import cert4 from "@/assets/4.jpg";
import cert5 from "@/assets/5.jpg";
import cert6 from "@/assets/6.jpg";
import cert7 from "@/assets/7.png";
import cert8 from "@/assets/8.png";
import cert9 from "@/assets/9.png";
import cert10 from "@/assets/10.jpg";
import cert11 from "@/assets/11.jpg";

const certificates = [
  {
    id: 1, // wajib — angka unik
    slug: "aws-cloud-practitioner", // wajib — untuk URL: /certificates/aws-cloud-practitioner
    title: "AWS Cloud Practitioner", // wajib — judul sertifikat
    issuer: "Amazon Web Services", // wajib — yang mengeluarkan sertifikat
    date: "2024-05", // wajib — tanggal (format YYYY-MM)
    image: cert1, // wajib — import gambar di atas
    credentialUrl: "https://aws.amazon.com/verification/xxx", // opsional — link verifikasi
    category: "Cloud", // wajib — salah satu: "Cloud", "Web", "AI", "Other"
    description:
      "Deskripsi singkat tentang sertifikat ini dan apa yang dipelajari.", // wajib
  },

  // ... sertifikat ke-2, ke-3, dst (template sama)
];
