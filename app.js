let popupShown = false;

window.addEventListener("scroll", function() {
    dino = document.getElementById('dino');
    chickencar = document.getElementById('chickencar');
    crash = document.getElementById('crash');

    // scroll
    maxScroll = document.body.scrollHeight - window.innerHeight;
    percent = window.scrollY / maxScroll;

    // dino position
    maxTop = window.innerHeight - dino.offsetHeight;
    dino.style.left = "50%";
    dino.style.transform = "translateX(-50%)";
    dino.style.top = (percent * maxTop) + "px";
    dino.style.position = "fixed";

    // chickencar at bottom 
    if (percent > 0.85) {
        chickencar.style.display = "flex";
    } else {
        chickencar.style.display = "none";
    }

    // chicken car position to meet dino at bottom center
    if (percent >= 0.85 && percent < 1) {
        carPercent = (percent - 0.85) / 0.15;
        carWidth = chickencar.offsetWidth;
        targetLeft = (window.innerWidth / 2) - (carWidth / 2); // Dino center
        startLeft = window.innerWidth; // Start off-screen right
        left = startLeft - carPercent * (startLeft - targetLeft);
        chickencar.style.bottom = "40px";
        chickencar.style.left = left + "px";
        chickencar.style.transform = ""; // Remove translateX
        crash.style.display = "none";
        popupShown = false; // Reset popup when not at bottom
    } else if (percent >= 1) {
        // At the bottom: show crash and alert once
        carWidth = chickencar.offsetWidth;
        targetLeft = (window.innerWidth / 2) - (carWidth / 2);
        chickencar.style.left = targetLeft + "px";
        chickencar.style.bottom = "40px";
        chickencar.style.transform = "";
        crash.style.display = "block";
        if (!popupShown) {
            alert("Because chickens didn't exist yet...Or did they?");
            popupShown = true;
        }
    } else {
        chickencar.style.left = window.innerWidth + "px";
        chickencar.style.bottom = "40px";
        chickencar.style.transform = "";
        crash.style.display = "none";
        popupShown = false; // Reset popup when not at bottom
    }
});