const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const createSilhouette = document.getElementById('createSilhouette');
const download = document.getElementById('download');
const sagomaSection = document.getElementById('sagomaSection');

// Gestione del caricamento dell'immagine
upload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        
        // Messaggio di caricamento
        sagomaSection.innerHTML = 'Caricamento dell\'immagine...';
        
        // Quando il file è stato letto
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                // Quando l'immagine è pronta, la disegniamo nel canvas
                sagomaSection.innerHTML = ''; // Rimuovi messaggio di caricamento
                canvas.width = Math.min(img.width, 400);  // Limita la larghezza a 400px
                canvas.height = Math.min(img.height, 400);  // Limita l'altezza a 400px
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
                ctx.drawImage(img, 0, 0); // Disegna l'immagine

                // Rendi visibile la sezione dei pulsanti per creare la silhouette e scaricarla
                sagomaSection.style.display = 'block';
            };

            img.onerror = () => {
                alert('Errore nel caricare l\'immagine');
            };
        };

        reader.onerror = () => {
            alert('Errore nella lettura del file. Assicurati che sia un\'immagine.');
        };

        reader.readAsDataURL(file); // Legge il file come URL di dati
    } else {
        alert('Nessun file selezionato');
    }
});

// Funzione per creare la silhouette in bianco e nero
createSilhouette.addEventListener('click', () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Media RGB
        const value = avg > 128 ? 255 : 0; // Soglia per il bianco e nero
        data[i] = data[i + 1] = data[i + 2] = value; // Imposta il colore (bianco o nero)
    }
    
    ctx.putImageData(imageData, 0, 0); // Ridisegna nel canvas
});

// Gestione del download della sagoma
download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.target = '_blank'; // Apre l'immagine in una nuova finestra per il download
    link.click(); // Simula un clic per scaricare l'immagine
});
