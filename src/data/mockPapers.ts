// src/data/mockPapers.ts
import { Paper, CategoryMeta, SourceMeta, AISummary, Source } from '../types'

export const CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: 'Semua', count: 6 },
  { id: 'teknik-ti', label: 'Teknik & TI', count: 1 },
  { id: 'manajemen', label: 'Manajemen', count: 2 },
  { id: 'sosial-hi', label: 'Sosial & Humaniora', count: 1 },
  { id: 'kesehatan', label: 'Kesehatan', count: 2 },
]

export const MOCK_PAPERS: Paper[] = [
  {
    id: 'p1',
    title: 'Deep Learning-Based Intrusion Detection System for IoT Networks: A Survey',
    authors: ['Ahmad Fauzi', 'Rini Setiawati', 'Budi Santoso'],
    year: 2026,
    journal: 'IEEE Access',
    doi: '10.1109/ACCESS.2026.1234567',
    category: 'teknik-ti',
    sources: ['Scopus', 'DOAJ'],
    openAccess: true,
    abstract:
      'This paper surveys recent advances in deep learning methods applied to intrusion detection in Internet of Things (IoT) environments. We analyze 120 papers published between 2022 and 2026, categorizing methods by architecture type, dataset, and performance metrics. Results indicate that transformer-based models outperform CNN-LSTM hybrids in detecting zero-day attacks with an average F1-score of 0.94.',
    citations: 142,
    publisher: 'IEEE',
  },
  {
    id: 'p2',
    title: 'Pengaruh Digital Marketing terhadap Keputusan Pembelian Generasi Z di Indonesia',
    authors: ['Dewi Rahayu', 'Muhammad Iqbal', 'Siti Fatimah'],
    year: 2025,
    journal: 'Jurnal Manajemen Indonesia',
    doi: '10.25041/jmi.2025.4321',
    category: 'manajemen',
    sources: ['Sinta', 'DOAJ'],
    openAccess: true,
    abstract:
      'Penelitian ini menganalisis pengaruh digital marketing (media sosial, influencer marketing, dan e-WOM) terhadap keputusan pembelian konsumen Generasi Z di Indonesia menggunakan Structural Equation Modeling (SEM). Sampel berjumlah 342 responden dari 5 kota besar di Indonesia. Hasil menunjukkan bahwa influencer marketing memiliki pengaruh signifikan (β=0.42, p<0.001) terhadap keputusan pembelian.',
    citations: 87,
    publisher: 'Universitas Trisakti',
  },
  {
    id: 'p3',
    title: 'Climate Diplomacy in Southeast Asia: ASEAN Framework Effectiveness Post-2023',
    authors: ['Dr. Layla Hassan', 'James Whitfield'],
    year: 2026,
    journal: 'Asian Journal of International Relations',
    doi: '10.1080/ajir.2026.98765',
    category: 'sosial-hi',
    sources: ['Scopus', 'Google Scholar'],
    openAccess: false,
    abstract:
      'This study evaluates the effectiveness of ASEAN climate diplomacy frameworks following the 2023 Kuala Lumpur Declaration. Using qualitative content analysis of 48 official documents and 20 expert interviews, we find that while multilateral commitments have increased, binding enforcement mechanisms remain insufficient.',
    citations: 34,
    publisher: 'Routledge',
  },
  {
    id: 'p4',
    title: 'Efektivitas Telemedicine terhadap Kepatuhan Minum Obat Pasien Hipertensi',
    authors: ['dr. Nurul Hidayah', 'Prof. Bambang Gunawan', 'Ayu Lestari'],
    year: 2025,
    journal: 'Jurnal Kesehatan Masyarakat Indonesia',
    doi: '10.21109/jkmi.2025.5678',
    category: 'kesehatan',
    sources: ['DOAJ'],
    openAccess: true,
    abstract:
      'Penelitian kuasi-eksperimental ini membandingkan kepatuhan minum obat antihipertensi pada pasien yang menggunakan layanan telemedicine versus konsultasi tatap muka selama 6 bulan. Total 180 subjek dibagi menjadi dua kelompok. Kelompok telemedicine menunjukkan kepatuhan lebih tinggi (78.3%) dibandingkan kelompok kontrol (61.2%), dengan perbedaan bermakna (p=0.004).',
    citations: 56,
    publisher: 'Ikatan Dokter Indonesia',
  },
  {
    id: 'p5',
    title: 'Federated Learning for Privacy-Preserving Healthcare Data Analysis',
    authors: ['Li Wei', 'Priya Sharma', 'Marco Bianchi'],
    year: 2026,
    journal: 'Nature Digital Medicine',
    doi: '10.1038/s41746-026-00123-4',
    category: 'kesehatan',
    sources: ['Scopus', 'DOAJ'],
    openAccess: true,
    abstract:
      'We propose FL-MedNet, a federated learning framework enabling collaborative model training across hospitals without sharing raw patient data. Evaluated on 15 hospitals across 5 countries with 1.2M records, FL-MedNet achieves 97.1% diagnostic accuracy on chest X-ray classification while satisfying GDPR and HIPAA requirements.',
    citations: 211,
    publisher: 'Nature Publishing Group',
  },
  {
    id: 'p6',
    title: 'Analisis Faktor Penyebab Turnover Intention Karyawan Milenial di Sektor Perbankan',
    authors: ['Irwan Kusuma', 'Nadia Permata'],
    year: 2025,
    journal: 'Jurnal Ekonomi & Bisnis',
    doi: '10.19105/jeb.2025.1122',
    category: 'manajemen',
    sources: ['Sinta', 'DOAJ'],
    openAccess: true,
    abstract:
      'Penelitian ini menginvestigasi determinan niat keluar (turnover intention) karyawan milenial di 10 bank umum Indonesia. Menggunakan model regresi logistik berganda pada 265 responden, ditemukan bahwa work-life balance (OR=3.12) dan pengembangan karier (OR=2.78) merupakan prediktor terkuat, melebihi kompensasi finansial.',
    citations: 43,
    publisher: 'IAIN Madura',
  },
]

export const SOURCES: SourceMeta[] = [
  { id: 'all', label: 'Semua Sumber', count: MOCK_PAPERS.length },
  { id: 'Scopus', label: 'Scopus', count: MOCK_PAPERS.filter((p) => p.sources.includes('Scopus')).length },
  { id: 'Sinta', label: 'Sinta', count: MOCK_PAPERS.filter((p) => p.sources.includes('Sinta')).length },
  { id: 'DOAJ', label: 'DOAJ', count: MOCK_PAPERS.filter((p) => p.sources.includes('DOAJ')).length },
  { id: 'Google Scholar', label: 'Google Scholar', count: MOCK_PAPERS.filter((p) => p.sources.includes('Google Scholar')).length },
]

export const AI_SUMMARIES: Record<string, AISummary> = {
  p1: {
    background: 'Ancaman keamanan siber pada ekosistem IoT terus meningkat seiring pertumbuhan perangkat yang terhubung. Metode deteksi intrusi konvensional tidak mampu menangani volume data dan kompleksitas serangan modern.',
    method: 'Studi literatur sistematis mencakup 120 publikasi (2022–2026) dari IEEE Xplore, Scopus, dan arXiv. Analisis mencakup arsitektur model, dataset benchmark, dan metrik performa.',
    results: 'Model berbasis Transformer unggul dengan rata-rata F1 = 0.94. CNN-LSTM menjadi pilihan kedua (F1 = 0.91). Dataset UNSW-NB15 dan CICIDS2023 paling banyak digunakan.',
    keywords: ['Deep Learning', 'IoT Security', 'Transformer', 'Intrusion Detection'],
  },
  p2: {
    background: 'Penetrasi e-commerce di Indonesia meningkat pesat, namun pemahaman tentang faktor digital marketing yang paling berpengaruh pada Generasi Z masih terbatas.',
    method: 'Pendekatan kuantitatif dengan SEM-PLS. Data dikumpulkan dari 342 responden di beberapa kota besar Indonesia.',
    results: 'Influencer marketing (β=0.42, p<0.001) dan e-WOM (β=0.38, p<0.001) berpengaruh signifikan terhadap keputusan pembelian.',
    keywords: ['Digital Marketing', 'Generasi Z', 'SEM-PLS', 'Influencer Marketing'],
  },
  p4: {
    background: 'Hipertensi merupakan penyebab kematian kardiovaskular nomor satu di Indonesia. Kepatuhan minum obat masih rendah akibat jarak ke fasilitas kesehatan dan minimnya pemantauan rutin.',
    method: 'Kuasi-eksperimental selama 6 bulan dengan 180 subjek pasien hipertensi, dibagi dua kelompok.',
    results: 'Telemedicine menunjukkan kepatuhan 78.3% dibandingkan kontrol 61.2% (p=0.004).',
    keywords: ['Telemedicine', 'Hipertensi', 'Kepatuhan Obat', 'Kesehatan Digital'],
  },
}
