// Cybersecurity 3D Model and Advanced Background Animation
class CybersecurityBackground {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.shields = [];
        this.codes = [];
        this.locks = [];
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.createShields();
        this.createCodeElements();
        this.createLocks();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 150;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                hue: Math.random() * 60 + 180 // Blue to cyan range
            });
        }
    }

    createShields() {
        for (let i = 0; i < 5; i++) {
            this.shields.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 40 + 30,
                rotation: 0,
                opacity: Math.random() * 0.3 + 0.1,
                speed: Math.random() * 0.02 + 0.01
            });
        }
    }

    createCodeElements() {
        const codeSnippets = ['01', '10', '11', '00', 'SEC', 'CTF', 'SOC'];
        for (let i = 0; i < 20; i++) {
            this.codes.push({
                text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                opacity: Math.random() * 0.4 + 0.2,
                size: Math.random() * 16 + 12
            });
        }
    }

    createLocks() {
        for (let i = 0; i < 8; i++) {
            this.locks.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 25 + 15,
                rotation: 0,
                opacity: Math.random() * 0.3 + 0.1,
                speed: Math.random() * 0.03 + 0.01,
                locked: Math.random() > 0.5
            });
        }
    }

    drawShield(x, y, size, rotation, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.globalAlpha = opacity;
        
        // Shield outline
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size);
        this.ctx.lineTo(size * 0.6, -size * 0.3);
        this.ctx.lineTo(size * 0.6, size * 0.3);
        this.ctx.lineTo(0, size);
        this.ctx.lineTo(-size * 0.6, size * 0.3);
        this.ctx.lineTo(-size * 0.6, -size * 0.3);
        this.ctx.closePath();
        this.ctx.stroke();
        
        // Shield inner glow
        this.ctx.strokeStyle = '#0088ff';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        this.ctx.restore();
    }

    drawLock(x, y, size, rotation, opacity, locked) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.globalAlpha = opacity;
        
        const color = locked ? '#ff0066' : '#00ff88';
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        
        // Lock body
        this.ctx.strokeRect(-size * 0.4, 0, size * 0.8, size * 0.6);
        
        // Lock shackle
        this.ctx.beginPath();
        this.ctx.arc(0, -size * 0.2, size * 0.3, Math.PI, 0, false);
        this.ctx.stroke();
        
        if (locked) {
            // Lock icon
            this.ctx.fillStyle = color;
            this.ctx.fillRect(-size * 0.1, size * 0.1, size * 0.2, size * 0.3);
        }
        
        this.ctx.restore();
    }

    drawConnections() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.globalAlpha = (150 - distance) / 150 * 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = `hsl(${particle.hue}, 100%, 50%)`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        // Update and draw shields
        this.shields.forEach(shield => {
            shield.rotation += shield.speed;
            this.drawShield(shield.x, shield.y, shield.size, shield.rotation, shield.opacity);
        });
        
        // Update and draw code elements
        this.codes.forEach(code => {
            code.x += code.vx;
            code.y += code.vy;
            
            // Wrap around edges
            if (code.x < 0) code.x = this.canvas.width;
            if (code.x > this.canvas.width) code.x = 0;
            if (code.y < 0) code.y = this.canvas.height;
            if (code.y > this.canvas.height) code.y = 0;
            
            // Draw code
            this.ctx.globalAlpha = code.opacity;
            this.ctx.fillStyle = '#00ff88';
            this.ctx.font = `${code.size}px "Courier New", monospace`;
            this.ctx.fillText(code.text, code.x, code.y);
        });
        
        // Update and draw locks
        this.locks.forEach(lock => {
            lock.rotation += lock.speed;
            this.drawLock(lock.x, lock.y, lock.size, lock.rotation, lock.opacity, lock.locked);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Matrix rain effect for cybersecurity theme
class MatrixRain {
    constructor() {
        this.matrixCanvas = document.createElement('canvas');
        this.matrixCanvas.id = 'matrix-canvas';
        this.matrixCanvas.style.position = 'fixed';
        this.matrixCanvas.style.top = '0';
        this.matrixCanvas.style.left = '0';
        this.matrixCanvas.style.zIndex = '-1';
        this.matrixCanvas.style.opacity = '0.1';
        document.body.appendChild(this.matrixCanvas);
        
        this.ctx = this.matrixCanvas.getContext('2d');
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-={}[]|\\:";\'<>?,./ ';
        this.charArray = this.chars.split('');
        this.drops = [];
        this.init();
    }
    
    init() {
        this.resize();
        this.createDrops();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.matrixCanvas.width = window.innerWidth;
        this.matrixCanvas.height = window.innerHeight;
        this.createDrops();
    }
    
    createDrops() {
        const columns = Math.floor(this.matrixCanvas.width / 20);
        this.drops = new Array(columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = '15px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            this.ctx.fillText(text, i * 20, this.drops[i] * 20);
            
            if (this.drops[i] * 20 > this.matrixCanvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced typing animation
class CybersecurityTypingEffect {
    constructor() {
        this.element = document.querySelector('.test p');
        this.texts = [
            'SOC Analyst',
            'CTF Player', 
            'Security Expert',
            'DFIR Specialist',
            'Threat Hunter',
            'Malware Analyst'
        ];
        this.currentIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const fullText = this.texts[this.currentIndex];
        
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        
        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentText === fullText) {
            speed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            speed = 500;
        }
        
        setTimeout(() => this.type(), speed);
    }
}

// Cybersecurity Robot 3D model simulation
class CyberSecurityRobot {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'cyber-robot-container';
        this.container.style.cssText = `
            position: fixed;
            bottom: 50px;
            right: 30px;
            width: 200px;
            height: 250px;
            z-index: 10;
            pointer-events: none;
            display: none;
            transform-style: preserve-3d;
            perspective: 800px;
        `;
        document.body.appendChild(this.container);
        this.mouseX = 0;
        this.mouseY = 0;
        this.createRobot();
        this.initMouseTracking();
        this.checkCurrentPage();
    }
    
    createRobot() {
        const robot = document.createElement('div');
        robot.className = 'cyber-robot';
        robot.innerHTML = `
            <div class="robot-shadow"></div>
            <div class="robot-head">
                <div class="head-top"></div>
                <div class="head-front">
                    <div class="robot-antenna">
                        <div class="antenna-light"></div>
                    </div>
                    <div class="robot-eyes">
                        <div class="eye left-eye">
                            <div class="eye-socket">
                                <div class="pupil left-pupil"></div>
                                <div class="eye-highlight"></div>
                            </div>
                        </div>
                        <div class="eye right-eye">
                            <div class="eye-socket">
                                <div class="pupil right-pupil"></div>
                                <div class="eye-highlight"></div>
                            </div>
                        </div>
                    </div>
                    <div class="robot-mouth">
                        <div class="mouth-speaker">
                            <div class="speaker-line"></div>
                            <div class="speaker-line"></div>
                            <div class="speaker-line"></div>
                        </div>
                    </div>
                </div>
                <div class="head-sides">
                    <div class="head-left"></div>
                    <div class="head-right"></div>
                </div>
            </div>
            <div class="robot-neck"></div>
            <div class="robot-body">
                <div class="body-front">
                    <div class="chest-panel">
                        <div class="security-badge">�</div>
                        <div class="status-lights">
                            <div class="status-light green"></div>
                            <div class="status-light blue"></div>
                            <div class="status-light orange"></div>
                        </div>
                        <div class="control-buttons">
                            <div class="button"></div>
                            <div class="button"></div>
                        </div>
                    </div>
                </div>
                <div class="body-sides">
                    <div class="body-left"></div>
                    <div class="body-right"></div>
                </div>
            </div>
            <div class="robot-arms">
                <div class="arm left-arm">
                    <div class="arm-upper"></div>
                    <div class="arm-joint"></div>
                    <div class="arm-lower"></div>
                    <div class="arm-hand"></div>
                </div>
                <div class="arm right-arm">
                    <div class="arm-upper"></div>
                    <div class="arm-joint"></div>
                    <div class="arm-lower"></div>
                    <div class="arm-hand"></div>
                </div>
            </div>
            <div class="robot-legs">
                <div class="leg left-leg"></div>
                <div class="leg right-leg"></div>
            </div>
        `;
        this.container.appendChild(robot);
    }
    
    initMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateEyePosition();
        });
        
        // Add click interaction
        document.addEventListener('click', () => {
            this.robotReaction();
        });
        
        // Add scroll interaction
        window.addEventListener('scroll', () => {
            this.robotScroll();
        });
    }
    
    robotReaction() {
        const robot = document.querySelector('.cyber-robot');
        const mouth = document.querySelector('.robot-mouth');
        
        if (robot && mouth) {
            robot.style.animation = 'robotExcited 1s ease-in-out';
            mouth.style.background = '#ff6b6b';
            mouth.style.borderRadius = '50%';
            
            setTimeout(() => {
                robot.style.animation = 'robotFloat 4s ease-in-out infinite';
                mouth.style.background = '#00ff88';
                mouth.style.borderRadius = '4px';
            }, 1000);
        }
    }
    
    robotScroll() {
        const antenna = document.querySelector('.antenna-light');
        if (antenna) {
            antenna.style.background = '#00ffff';
            antenna.style.boxShadow = '0 0 20px #00ffff';
            
            setTimeout(() => {
                antenna.style.background = '#ff0066';
                antenna.style.boxShadow = '0 0 15px #ff0066';
            }, 500);
        }
    }
    
    updateEyePosition() {
        const leftPupil = document.querySelector('.left-pupil');
        const rightPupil = document.querySelector('.right-pupil');
        
        if (leftPupil && rightPupil) {
            const containerRect = this.container.getBoundingClientRect();
            const centerX = containerRect.left + containerRect.width / 2;
            const centerY = containerRect.top + containerRect.height / 3;
            
            const angle = Math.atan2(this.mouseY - centerY, this.mouseX - centerX);
            const distance = Math.min(8, Math.sqrt(Math.pow(this.mouseX - centerX, 2) + Math.pow(this.mouseY - centerY, 2)) / 20);
            
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;
            
            leftPupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
            rightPupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        }
    }
    
    checkCurrentPage() {
        // Show robot only on home page
        const homeSection = document.getElementById('home');
        const observer = new MutationObserver(() => {
            if (homeSection && homeSection.classList.contains('tab-active')) {
                this.show();
            } else {
                this.hide();
            }
        });
        
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
        
        // Initial check
        if (homeSection && homeSection.classList.contains('tab-active')) {
            this.show();
        }
    }
    
    show() {
        this.container.style.display = 'block';
        setTimeout(() => {
            this.container.style.opacity = '1';
            this.container.style.transform = 'translateY(-50%) scale(1)';
            
            // Add welcome animation
            const robot = this.container.querySelector('.cyber-robot');
            if (robot) {
                robot.style.animation = 'robotExcited 2s ease-in-out, robotFloat 4s ease-in-out infinite 2s';
            }
            
            // Add sound effect simulation (visual)
            this.addSoundWaves();
        }, 100);
    }
    
    addSoundWaves() {
        const soundWave = document.createElement('div');
        soundWave.className = 'sound-wave';
        soundWave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            border: 2px solid #00ffff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: soundWaveExpand 2s ease-out;
            pointer-events: none;
        `;
        
        this.container.appendChild(soundWave);
        
        setTimeout(() => {
            soundWave.remove();
        }, 2000);
    }
    
    hide() {
        this.container.style.opacity = '0';
        this.container.style.transform = 'translateY(-50%) scale(0.8)';
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 300);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cybersecurity background
    new CybersecurityBackground();
    
    // Initialize matrix rain effect
    new MatrixRain();
    
    // Initialize enhanced typing effect
    new CybersecurityTypingEffect();
    
    // Initialize 3D robot
    new CyberSecurityRobot();
    
    // Add floating cyber elements
    setInterval(() => {
        createFloatingElement();
    }, 3000);
});

function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating-cyber-element';
    element.innerHTML = ['🛡️', '🔐', '⚡', '🔍', '💻'][Math.floor(Math.random() * 5)];
    element.style.cssText = `
        position: fixed;
        font-size: 20px;
        color: #00ffff;
        pointer-events: none;
        z-index: 1;
        animation: float-across 8s linear;
        left: -50px;
        top: ${Math.random() * window.innerHeight}px;
    `;
    
    document.body.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        element.remove();
    }, 8000);
}
