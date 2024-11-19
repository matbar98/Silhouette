const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const download = document.getElementById('download');

// Gestione del caricamento dell'immagine
upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                // Quando l'immagine è caricata, disegniamola nel canvas
                console.log('Immagine caricata e pronta per essere disegnata');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
                ctx.drawImage(img, 0, 0); // Disegna l'immagine sul canvas
            };

            img.onerror = () => {
                console.error('Errore nel caricare l\'immagine');
            };
        };

        reader.onerror = () => {
            console.error('Errore nella lettura del file');
        };

        reader.readAsDataURL(file); // Legge il file come URL
    } else {
        console.error('Nessun file selezionato');
    }
});

// Gestione del download della sagoma
download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'sagoma.png';
    link.href = canvas.toDataURL();
    link.click();
});













