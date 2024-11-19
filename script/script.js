const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const download = document.getElementById('download');

// Gestione del caricamento dell'immagine
upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
            // Adatta l'immagine al canvas
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Genera la sagoma (soglia di bianco/nero)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                const value = avg > 128 ? 255 : 0; // Soglia
                data[i] = data[i + 1] = data[i + 2] = value; // Bianco o nero
            }
            ctx.putImageData(imageData, 0, 0);
        };
    };
    reader.readAsDataURL(file);
});

// Gestione del download della sagoma
download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'sagoma.png';
    link.href = canvas.toDataURL();
    link.click();
});









// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals








