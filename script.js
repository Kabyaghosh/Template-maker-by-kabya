document.getElementById('text-input').addEventListener('input', function(event) {
    document.getElementById('template-text').textContent = event.target.value;
});

document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('template-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function downloadTemplate() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const img = document.getElementById('template-image');
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.drawImage(img, 0, 0);

    const text = document.getElementById('template-text').textContent;
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 50, img.height - 50);

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'custom_template.png';
    link.click();
}
