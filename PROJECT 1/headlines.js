let headlinesData = [];
let particles = [];
let sketchStarted = false;

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

class Particle {
    constructor(headline, url, x, y) {
        this.headline = headline;
        this.url = url;
        this.x = x;
        this.y = y;
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.size = random(10, 25);
        this.color = random(colors);
        this.angle = random(TWO_PI);
        this.angleVel = random(-0.02, 0.02);
        this.isHovered = false;
    }

    update() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        this.isHovered = d < this.size;

        if (!this.isHovered) {
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.angleVel;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        
        fill(this.color);
        textAlign(CENTER, CENTER);
        textSize(this.size * 2);
        textStyle(BOLD);
        noStroke();
        text('$', 0, 0);
        
        pop();
        
        if (this.isHovered) {
            push();
            fill(0);
            noStroke();
            rectMode(CENTER);
            let boxWidth = min(textWidth(this.headline) + 20, width - 40);
            let boxHeight = this.url ? 70 : 50;
            rect(this.x, this.y - this.size - 40, boxWidth, boxHeight);
            
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(14);
            textStyle(NORMAL);
            text(this.headline, this.x, this.y - this.size - 50, boxWidth - 10);
            
            if (this.url) {
                fill(100, 200, 255);
                textSize(12);
                text("Click to read more", this.x, this.y - this.size - 25);
            }
            pop();
        }
    }

    clicked() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.size) {
            if (this.url) {
                window.open(this.url, '_blank');
            }
            this.vx = random(-5, 5);
            this.vy = random(-5, 5);
            this.size = random(15, 30);
            this.color = random(colors);
            return true;
        }
        return false;
    }
}

// p5.js 
function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);

    if (sketchStarted && particles.length > 0) {
        for (let particle of particles) {
            particle.update();
            particle.display();
        }
    }
}

function mousePressed() {
    for (let particle of particles) {
        particle.clicked();
    }
}

let hasInteracted = false;
function mouseMoved() {
    if (!hasInteracted && sketchStarted) {
        hasInteracted = true;
        let textBox = document.querySelector('.main-text');
        if (textBox) {
            textBox.style.transition = 'all 1s ease-in-out';
            textBox.style.fontSize = '150px';
            textBox.style.fontWeight = 'bold';
            textBox.style.color = random(colors);
            textBox.innerHTML = '$';
            
            setTimeout(() => {
                textBox.style.opacity = '0';
                setTimeout(() => {
                    textBox.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// FETCH headlines from Reddit
async function fetchHeadlines() {
    const minLoadingTime = 1000;
    const startTime = Date.now();
    
    try {
        console.log('Starting fetch...');
        
        const proxy = 'https://corsproxy.io/?';
        
        const responses = await Promise.all([
            fetch(proxy + encodeURIComponent('https://www.reddit.com/r/worldnews.json?limit=100')),
            fetch(proxy + encodeURIComponent('https://www.reddit.com/r/news.json?limit=100')),
            fetch(proxy + encodeURIComponent('https://www.reddit.com/r/Palestine.json?limit=50')),
            fetch(proxy + encodeURIComponent('https://www.reddit.com/r/israel.json?limit=50'))
        ]);

        console.log('Responses received');
        
        const dataArrays = await Promise.all(responses.map(r => r.json()));
        
        let allPosts = [];
        dataArrays.forEach(data => {
            if (data.data && data.data.children) {
                allPosts = allPosts.concat(data.data.children);
            }
        });

        console.log('Total posts:', allPosts.length);

        const keywords = ['gaza', 'palestine', 'palestinian', 'israel', 'hamas', 'west bank', 'middle east', 'idf', 'ceasefire', 'humanitarian'];
        
        headlinesData = allPosts
            .filter(post => {
                const lowerTitle = post.data.title.toLowerCase();
                return keywords.some(keyword => lowerTitle.includes(keyword));
            })
            .map(post => ({
                title: post.data.title,
                url: 'https://reddit.com' + post.data.permalink
            }));

        console.log('Filtered headlines count:', headlinesData.length);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        await new Promise(resolve => setTimeout(resolve, remainingTime));

        if (headlinesData.length > 0) {
            document.getElementById('loading').style.display = 'none';
            startParticles();
        } else {
            headlinesData = [
                { title: "VIVA LA REVOLUCIÒN", url: null },
                { title: "OUR TAXES ARE FUNDING A GENOCIDE.", url: null },
                { title: "To be silent is to be complicit.", url: null },
                { title: "Free Palestine", url: null },
                { title: "End the occupation", url: null }
            ];
            document.getElementById('loading').style.display = 'none';
            startParticles();
        }
    } catch (error) {
        console.error('Error fetching headlines:', error);
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        await new Promise(resolve => setTimeout(resolve, remainingTime));
        
        headlinesData = [
            { title: "VIVA LA REVOLUCIÒN", url: null },
            { title: "OUR TAXES ARE FUNDING A GENOCIDE.", url: null },
            { title: "To be silent is to be complicit.", url: null },
            { title: "Free Palestine", url: null },
            { title: "End the occupation", url: null }
        ];
        document.getElementById('loading').style.display = 'none';
        startParticles();
    }
}

function startParticles() {
    sketchStarted = true;
    
    for (let item of headlinesData) {
        let x = random(width);
        let y = random(height);
        particles.push(new Particle(item.title, item.url, x, y));
    }
    
    console.log('Created', particles.length, 'particles');
}

fetchHeadlines();