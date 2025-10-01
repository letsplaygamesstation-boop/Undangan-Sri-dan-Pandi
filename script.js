// File: script.js

// 1. Fungsi untuk Tombol Buka Undangan
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan 3 variabel ini ada dan merujuk ke ID yang benar
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    const openButton = document.getElementById('open-button');

    openButton.addEventListener('click', () => {
        // Hilangkan cover page dengan efek transisi sederhana
        coverPage.style.opacity = '0';
        
        setTimeout(() => {
            coverPage.style.display = 'none';
            // Tampilkan konten utama
            mainContent.classList.remove('hidden');
            
            // LOKASI PENEMPATAN KODE LAGU YANG TEPAT:
            // 1. Ambil elemen audio menggunakan ID-nya dari HTML
            const audio = document.getElementById('myAudio');
            
            // 2. Panggil fungsi play()
            audio.play().catch(error => {
                console.log("Audio play failed, perhaps due to browser policy.");
                // Ini untuk menangani error jika browser memblokir autoplay
            });
            // ----------------------------------------------------

        }, 600); // Tunggu 600ms (sesuai waktu transisi)
        
        // Baris "Opsional: Play musik latar belakang di sini" yang lama bisa dihapus atau diganti
    });
});


// 2. Fungsi untuk Salin Nomor Rekening
function copyToClipboard(elementId, buttonElement) {
    // Ambil elemen yang berisi nomor rekening
    const accountElement = document.getElementById(elementId);
    
    // Teks yang akan disalin
    const textToCopy = accountElement.textContent || accountElement.innerText;

    // Gunakan Clipboard API modern
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Ubah teks tombol menjadi "Tersalin!"
            const originalText = buttonElement.textContent;
            buttonElement.textContent = "Tersalin!";
            
            // Kembalikan teks tombol setelah 2 detik
            setTimeout(() => {
                buttonElement.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Gagal menyalin:', err);
            alert('Gagal menyalin, silakan salin manual: ' + textToCopy);
        });
    } else {
        // Fallback untuk browser lama
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            // Ubah teks tombol
            const originalText = buttonElement.textContent;
            buttonElement.textContent = "Tersalin!";
            setTimeout(() => {
                buttonElement.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Gagal menyalin:', err);
            alert('Gagal menyalin, silakan salin manual: ' + textToCopy);
        }
        document.body.removeChild(textArea);
    }
}
