let count = 0;

// steps 
// 1. identify and select the button
let button;
let colorButton;
let bgColors = ["#ef4269", "#ffd23f", "#3bceac", "#0ead69", "#0ead69", "#3bceac", "#ffd23f", "#ef4269"];
let choice = 0;

button = document.getElementById('button');

// 2. listen to event (click)
// 3. do something when that event happens (callback function)
button.addEventListener("click", function() {
    count+=1;
    document.getElementById('counter').innerHTML = 
    count;
});

// button to change background color
colorButton = document.getElementById('button-color');
colorButton.addEventListener("click", function() {
    console.log("change color");
    document.body.style.backgroundColor = bgColors[choice];
    choice = (choice+1)%3;

});

//check for scrolling on the window
window.addEventListener("scroll", function() {
    console.log(window.scrollY);
    document.body.style.backgroundColor = "hsl(" + window.scrollY%360 + ", 50%, 50%)"; 
})