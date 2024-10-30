const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5; // Increase max size for more impact
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.alpha = 1;
        this.hue = Math.floor(Math.random() * 360);
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02; // Slower fade
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
        ctx.shadowBlur = 20; // Increased shadow blur for depth
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Handle particles
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].alpha <= 0) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.2)'; // Darker trail
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

// Mouse movement listener
canvas.addEventListener("mousemove", (event) => {
    for (let i = 0; i < 4; i++) {
        particlesArray.push(new Particle(event.x, event.y));
    }
});

// Touch movement listener
canvas.addEventListener("touchmove", (event) => {
    for (let i = 0; i < 4; i++) {
        particlesArray.push(new Particle(event.touches[0].clientX, event.touches[0].clientY));
    }
});

// Resize canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();