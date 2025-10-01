// change background color 
const colors = [
    '#FF00FF',  
    '#00FFFF',  
    '#FFFF00',  
    '#FF0000',  
    '#00FF00',  
    '#FF6600', 
    '#9933FF',  
    '#FF0099'   
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function changeBackground() {
    document.body.style.backgroundColor = getRandomColor();
}

// background changes every 150ms
setInterval(changeBackground, 150);

document.body.style.backgroundColor = colors[0];

// button link to:
const button = document.getElementById('proj__entrance');
if (button) {
    button.addEventListener('click', function() {
        window.location.href = './headlines.html';
    });
}