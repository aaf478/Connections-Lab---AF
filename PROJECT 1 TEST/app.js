// Array of vibrant colors to flicker through
const colors = [
    '#FF00FF',  // Magenta
    '#00FFFF',  // Cyan
    '#FFFF00',  // Yellow
    '#FF0000',  // Red
    '#00FF00',  // Green
    '#FF6600',  // Orange
    '#9933FF',  // Purple
    '#FF0099'   // Hot Pink
];

// Function to get a random color from the array
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Change background color at intervals
function flickerBackground() {
    document.body.style.backgroundColor = getRandomColor();
}

// Start flickering - change every 150ms for fast flicker
setInterval(flickerBackground, 150);

// Set initial color
document.body.style.backgroundColor = colors[0];

const button = document.getElementById('proj__entrance');
   if (button) {
       button.addEventListener('click', function() {
           window.location.href = 'headlines.html';
       });
   }