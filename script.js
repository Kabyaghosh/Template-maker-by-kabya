// Set the current date dynamically
const dateElement = document.getElementById('date-text');
const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
dateElement.textContent = currentDate;

// Function to update headline text
document.getElementById('text-input').addEventListener('input', function(event) {
    document.getElementById('headline-text').textContent = event.target.value;
});

// Function to update text color
document.getElementById('color-picker').addEventListener('input', function(event) {
    document.getElementById('headline-text').style.color = event.target.value;
});

// Function to update logo image
function updateLogo(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('logo').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Function to update main image
function updateImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('template-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Function to download the edited template as an image
function downloadTemplate() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = document.getElementById('template-image');
    canvas.width = img.width;
    canvas.height = img.height + 150;  // Extra space for headline and footer

    // Draw the background image
    ctx.drawImage(img, 0, 0);

    // Draw headline text
    const headline = document.getElementById('headline-text').textContent;
    ctx.font = '36px Varela Round';
    ctx.fillStyle = '#ffffff';
    ctx.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.6)';
    ctx.fillText(headline, 20, img.height - 20);

    // Draw date
    const date = document.getElementById('date-text').textContent;
    ctx.font = '18px Varela Round';
    ctx.fillText(date, canvas.width - 300, 40);

    // Save the canvas as a PNG image
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'custom_news_template.png';
    link.click();
}
