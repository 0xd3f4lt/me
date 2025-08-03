const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Enhanced cybersecurity-themed colors
const colours = ['#00ffff', '#00ff88', '#0088ff', '#ff6b6b', '#4ecdc4', '#ffe66d'];
const maxParticles = 100;
let particles = [];
let connections = [];

// Enhanced speed control
const speedFactor = 0.5;

class Particle {
    constructor(x, y, vx, vy, radius, colour) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.colour = colour;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
    }
    
    move() {
        // Bounce off edges instead of resetting
        if (this.x <= 0 || this.x >= width) {
            this.vx *= -1;
        }
        if (this.y <= 0 || this.y >= height) {
            this.vy *= -1;
        }
        
        // Keep particles within bounds
        this.x = Math.max(0, Math.min(width, this.x + this.vx));
        this.y = Math.max(0, Math.min(height, this.y + this.vy));
        
        // Add pulsing effect
        this.opacity += this.pulseDirection * this.pulseSpeed;
        if (this.opacity <= 0.2 || this.opacity >= 1) {
            this.pulseDirection *= -1;
        }
    }
    
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = speedFactor * (2 + Math.random() * -4);
        this.vy = speedFactor * (2 + Math.random() * -4);
        this.radius = 1 + Math.random() * 2;
        this.colour = colours[Math.floor(Math.random() * colours.length)];
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Add glow effect
        ctx.shadowColor = this.colour;
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.colour;
        ctx.fill();
        
        ctx.restore();
    }
}

function initParticles() {
    for (let i = 0; i < maxParticles; i++) {
        setTimeout(createParticle, 10 * i, i);
    }
}

function createParticle(i) {
    let p = new Particle(
        Math.floor(Math.random() * width), // x
        Math.floor(Math.random() * height), // y
        speedFactor * (1.5 + Math.random() * -3), // vx
        speedFactor * (1.5 + Math.random() * -3), // vy
        1 + Math.random() * 2, // radius
        colours[Math.floor(Math.random() * colours.length)]
    );
    particles.push(p);
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                ctx.save();
                ctx.globalAlpha = (120 - distance) / 120 * 0.3;
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.restore();
            }
        }
    }
}

function loop() {
    // Create gradient background
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    gradient.addColorStop(0, 'rgba(0, 20, 40, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw connections first
    drawConnections();
    
    // Update and draw particles
    for (let particle of particles) {
        particle.move();
        particle.draw(ctx);
    }
    requestAnimationFrame(loop);
}

// Start animation
initParticles();
loop();

// Enhanced resize handler
window.addEventListener('resize', resize);
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Adjust particle positions to new canvas size
    particles.forEach(particle => {
        if (particle.x > width) particle.x = width;
        if (particle.y > height) particle.y = height;
    });
}