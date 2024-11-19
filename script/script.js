const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const download = document.getElementById('download');

// Gestione del caricamento dell'immagine
upload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        
        // Quando il file è stato letto
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                // Quando l'immagine è pronta, la disegniamo nel canvas
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
                ctx.drawImage(img, 0, 0); // Disegna l'immagine

                // Genera la sagoma in bianco e nero
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Media RGB
                    const value = avg > 128 ? 255 : 0; // Soglia per il bianco e nero
                    data[i] = data[i + 1] = data[i + 2] = value; // Imposta il colore (bianco o nero)
                }
                
                ctx.putImageData(imageData, 0, 0); // Ridisegna nel canvas
            };

            img.onerror = () => {
                console.error('Errore nel caricare l\'immagine');
            };
        };

        reader.onerror = () => {
            console.error('Errore nella lettura del file');
        };

        reader.readAsDataURL(file); // Legge il file come URL di dati
    } else {
        console.error('Nessun file selezionato');
    }
});

// Gestione del download della sagoma
download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'sagoma.png';
    link.href = canvas.toDataURL(); // Crea l'immagine da scaricare
    link.click(); // Simula un clic per scaricare l'immagine
});
