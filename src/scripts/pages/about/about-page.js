export default class AboutPage {
  async render() {
    return `
      <section class="content about-container">
        <h1 class="content__title">Tentang Aplikasi StoryMap</h1>
        
        <div class="about-section">
          <h2>Deskripsi</h2>
          <p>
            StoryMap adalah sebuah aplikasi web Single-Page Application (SPA) yang memungkinkan pengguna untuk berbagi cerita singkat lengkap dengan lokasi di peta digital. Aplikasi ini dibangun sebagai Proyek Submission untuk kelas "Menjadi Front-End Web Developer Expert" di Dicoding.
          </p>
          <p>
            Aplikasi ini dirancang untuk menampilkan data dari API publik, memvisualisasikannya di atas peta interaktif, dan memungkinkan pengguna untuk menambahkan data baru. Proyek ini mengimplementasikan berbagai fitur modern pengembangan web, termasuk desain responsif dan standar aksesibilitas.
          </p>
        </div>

        <div class="about-section">
          <h2>Fitur Utama</h2>
          <ul>
            <li>Visualisasi data cerita pada peta digital interaktif menggunakan Leaflet.js.</li>
            <li>Menampilkan marker untuk setiap cerita, lengkap dengan pop-up detail.</li>
            <li>Pilihan layer peta antara mode 'Street View' dan 'Satelit View'.</li>
            <li>Sinkronisasi antara daftar cerita dan peta untuk navigasi yang mudah.</li>
            <li>Fitur tambah cerita baru dengan pemilihan lokasi melalui klik peta.</li>
            <li>Opsi pengiriman gambar melalui unggah file atau akses kamera langsung.</li>
            <li>Desain responsif yang dapat diakses di perangkat mobile, tablet, dan desktop.</li>
            <li>Penerapan standar aksesibilitas, termasuk navigasi keyboard dan fitur "Skip to Content".</li>
          </ul>
        </div>

        
      </section>
    `;
  }

  async afterRender() {
  }
}