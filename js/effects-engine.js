// Effects Engine - Advanced Visual Effects for Matrix System
// Handles lightning, waves, glitches, pulses, and other cool effects

class EffectsEngine {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.effects = [];
        this.scanlinePosition = 0;
        this.glitchLevel = 0;
        this.pulseRadius = 0;
        this.currentTheme = COLOR_THEMES.matrix;
        
        // Effect timers
        this.lastScanlineUpdate = Date.now();
        this.lastGlitchUpdate = Date.now();
        this.lastPulseUpdate = Date.now();
        
        // Lightning system
        this.lightningBolts = [];
        this.lightningChance = 0;
        
        // Wave system
        this.waves = [];
        this.waveSpeed = 2;
        
        console.log('Effects Engine initialized');
    }
    
    // Update all effects
    update() {
        this.updateScanlines();
        this.updateGlitch();
        this.updatePulse();
        this.updateLightning();
        this.updateWaves();
        this.cleanupExpiredEffects();
    }
    
    // Draw all effects
    render() {
        this.renderScanlines();
        this.renderGlitch();
        this.renderPulse();
        this.renderLightning();
        this.renderWaves();
        this.renderScreenDistortion();
    }
    
    // === SCANLINE EFFECTS ===
    updateScanlines() {
        const now = Date.now();
        if (now - this.lastScanlineUpdate > 16) { // 60fps
            this.scanlinePosition += 2;
            if (this.scanlinePosition > this.canvas.height + 50) {
                this.scanlinePosition = -50;
            }
            this.lastScanlineUpdate = now;
        }
    }
    
    renderScanlines() {
        // Horizontal scanning line
        this.ctx.save();
        this.ctx.globalAlpha = 0.3;
        
        // Main scanline
        this.ctx.strokeStyle = this.currentTheme.scanline;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.scanlinePosition);
        this.ctx.lineTo(this.canvas.width, this.scanlinePosition);
        this.ctx.stroke();
        
        // Scanline glow
        this.ctx.strokeStyle = this.currentTheme.primary;
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.scanlinePosition - 2);
        this.ctx.lineTo(this.canvas.width, this.scanlinePosition - 2);
        this.ctx.moveTo(0, this.scanlinePosition + 2);
        this.ctx.lineTo(this.canvas.width, this.scanlinePosition + 2);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    // === GLITCH EFFECTS ===
    updateGlitch() {
        const now = Date.now();
        if (now - this.lastGlitchUpdate > 100) {
            if (this.glitchLevel > 0) {
                this.glitchLevel *= 0.9; // Fade out glitch
                if (this.glitchLevel < 0.01) this.glitchLevel = 0;
            }
            this.lastGlitchUpdate = now;
        }
    }
    
    renderGlitch() {
        if (this.glitchLevel <= 0) return;
        
        this.ctx.save();
        this.ctx.globalAlpha = this.glitchLevel;
        
        // Random color displacement
        const displacement = Math.random() * 10 * this.glitchLevel;
        
        // Red channel shift
        this.ctx.globalCompositeOperation = 'screen';
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        this.ctx.fillRect(-displacement, 0, this.canvas.width, this.canvas.height);
        
        // Blue channel shift  
        this.ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
        this.ctx.fillRect(displacement, 0, this.canvas.width, this.canvas.height);
        
        // Random horizontal lines
        for (let i = 0; i < 5; i++) {
            const y = Math.random() * this.canvas.height;
            const height = Math.random() * 3 + 1;
            this.ctx.fillStyle = this.currentTheme.primary;
            this.ctx.fillRect(0, y, this.canvas.width, height);
        }
        
        this.ctx.restore();
    }
    
    triggerGlitch(intensity = 0.5) {
        this.glitchLevel = Math.max(this.glitchLevel, intensity);
        console.log('Glitch effect triggered:', intensity);
    }    
    // === PULSE EFFECTS ===
    updatePulse() {
        const now = Date.now();
        if (now - this.lastPulseUpdate > 50) {
            if (this.pulseRadius > 0) {
                this.pulseRadius += 15;
                if (this.pulseRadius > Math.max(this.canvas.width, this.canvas.height)) {
                    this.pulseRadius = 0;
                }
            }
            this.lastPulseUpdate = now;
        }
    }
    
    renderPulse() {
        if (this.pulseRadius <= 0) return;
        
        this.ctx.save();
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const maxRadius = Math.max(this.canvas.width, this.canvas.height);
        const alpha = 1 - (this.pulseRadius / maxRadius);
        
        // Outer pulse ring
        this.ctx.globalAlpha = alpha * 0.3;
        this.ctx.strokeStyle = this.currentTheme.primary;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.pulseRadius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Inner pulse ring
        this.ctx.globalAlpha = alpha * 0.5;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.pulseRadius * 0.8, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    triggerPulse() {
        this.pulseRadius = 10;
        console.log('Pulse effect triggered');
    }
    
    // === LIGHTNING EFFECTS ===
    updateLightning() {
        // Update existing lightning bolts
        this.lightningBolts = this.lightningBolts.filter(bolt => {
            bolt.age += 16;
            return bolt.age < bolt.lifespan;
        });
        
        // Random lightning chance
        if (Math.random() < 0.002) {
            this.createRandomLightning();
        }
    }
    
    createLightning(startX, startY, endX, endY, intensity = 1) {
        const bolt = {
            segments: this.generateLightningPath(startX, startY, endX, endY),
            intensity: intensity,
            age: 0,
            lifespan: 200 + Math.random() * 300,
            color: this.currentTheme.lightning,
            thickness: 2 + intensity
        };
        
        this.lightningBolts.push(bolt);
        
        // Add branching lightning
        if (Math.random() < 0.7) {
            const midPoint = Math.floor(bolt.segments.length / 2);
            const branchStart = bolt.segments[midPoint];
            const branchEnd = {
                x: branchStart.x + (Math.random() - 0.5) * 200,
                y: branchStart.y + Math.random() * 150
            };
            
            const branch = {
                segments: this.generateLightningPath(branchStart.x, branchStart.y, branchEnd.x, branchEnd.y),
                intensity: intensity * 0.6,
                age: 0,
                lifespan: 150,
                color: this.currentTheme.lightning,
                thickness: 1 + intensity * 0.6
            };
            
            this.lightningBolts.push(branch);
        }
    }
    
    generateLightningPath(startX, startY, endX, endY) {
        const segments = [];
        const steps = Math.floor(Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 10);
        
        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            const x = startX + (endX - startX) * progress + (Math.random() - 0.5) * 30;
            const y = startY + (endY - startY) * progress + (Math.random() - 0.5) * 20;
            segments.push({ x, y });
        }
        
        return segments;
    }
    
    createRandomLightning() {
        const startX = Math.random() * this.canvas.width;
        const startY = -50;
        const endX = Math.random() * this.canvas.width;
        const endY = this.canvas.height + 50;
        
        this.createLightning(startX, startY, endX, endY, 0.5 + Math.random() * 0.5);
    }
    
    renderLightning() {
        this.ctx.save();
        
        this.lightningBolts.forEach(bolt => {
            const alpha = 1 - (bolt.age / bolt.lifespan);
            this.ctx.globalAlpha = alpha;
            this.ctx.strokeStyle = bolt.color;
            this.ctx.lineWidth = bolt.thickness;
            this.ctx.lineCap = 'round';
            
            // Main lightning bolt
            this.ctx.beginPath();
            bolt.segments.forEach((segment, index) => {
                if (index === 0) {
                    this.ctx.moveTo(segment.x, segment.y);
                } else {
                    this.ctx.lineTo(segment.x, segment.y);
                }
            });
            this.ctx.stroke();
            
            // Lightning glow
            this.ctx.globalAlpha = alpha * 0.3;
            this.ctx.lineWidth = bolt.thickness + 4;
            this.ctx.stroke();
        });
        
        this.ctx.restore();
    }
    
    triggerLightning() {
        const startX = Math.random() * this.canvas.width;
        const startY = 0;
        const endX = Math.random() * this.canvas.width;
        const endY = this.canvas.height;
        
        this.createLightning(startX, startY, endX, endY, 0.8 + Math.random() * 0.4);
        
        // Trigger glitch effect with lightning
        this.triggerGlitch(0.3);
        
        console.log('Lightning effect triggered');
    }    
    // === WAVE EFFECTS ===
    updateWaves() {
        this.waves = this.waves.filter(wave => {
            wave.age += 16;
            wave.radius += wave.speed;
            return wave.age < wave.lifespan && wave.radius < wave.maxRadius;
        });
    }
    
    createWave(centerX, centerY, intensity = 1) {
        const wave = {
            x: centerX,
            y: centerY,
            radius: 10,
            speed: 3 + intensity * 2,
            maxRadius: Math.max(this.canvas.width, this.canvas.height) * 1.5,
            intensity: intensity,
            age: 0,
            lifespan: 2000,
            color: this.currentTheme.wave
        };
        
        this.waves.push(wave);
    }
    
    renderWaves() {
        this.ctx.save();
        
        this.waves.forEach(wave => {
            const alpha = (1 - (wave.age / wave.lifespan)) * wave.intensity;
            this.ctx.globalAlpha = alpha;
            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 2;
            
            // Multiple wave rings for depth
            for (let i = 0; i < 3; i++) {
                const ringRadius = wave.radius - (i * 20);
                if (ringRadius > 0) {
                    this.ctx.globalAlpha = alpha * (1 - i * 0.3);
                    this.ctx.beginPath();
                    this.ctx.arc(wave.x, wave.y, ringRadius, 0, Math.PI * 2);
                    this.ctx.stroke();
                }
            }
        });
        
        this.ctx.restore();
    }
    
    triggerWave() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        this.createWave(centerX, centerY, 0.8);
        
        // Add some random waves for effect
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const x = centerX + (Math.random() - 0.5) * 200;
                const y = centerY + (Math.random() - 0.5) * 200;
                this.createWave(x, y, 0.4);
            }, i * 200);
        }
        
        console.log('Wave effect triggered');
    }
    
    // === SCREEN DISTORTION ===
    renderScreenDistortion() {
        if (this.glitchLevel <= 0) return;
        
        this.ctx.save();
        this.ctx.globalAlpha = this.glitchLevel * 0.1;
        this.ctx.globalCompositeOperation = 'overlay';
        
        // Create distortion patterns
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, this.currentTheme.primary);
        gradient.addColorStop(0.5, 'transparent');
        gradient.addColorStop(1, this.currentTheme.secondary);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.restore();
    }
    
    // === UTILITY METHODS ===
    cleanupExpiredEffects() {
        // Remove old effects to prevent memory leaks
        this.effects = this.effects.filter(effect => !effect.expired);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        console.log('Effects theme updated to:', theme.displayName);
    }
    
    // Trigger random effect
    triggerRandomEffect() {
        const effects = ['lightning', 'wave', 'glitch', 'pulse'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        switch (randomEffect) {
            case 'lightning':
                this.triggerLightning();
                break;
            case 'wave':
                this.triggerWave();
                break;
            case 'glitch':
                this.triggerGlitch(0.6);
                break;
            case 'pulse':
                this.triggerPulse();
                break;
        }
    }
    
    // Screen shake effect
    triggerScreenShake(intensity = 5, duration = 200) {
        const originalTransform = this.ctx.getTransform();
        const startTime = Date.now();
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const progress = elapsed / duration;
                const currentIntensity = intensity * (1 - progress);
                
                const offsetX = (Math.random() - 0.5) * currentIntensity;
                const offsetY = (Math.random() - 0.5) * currentIntensity;
                
                this.ctx.setTransform(1, 0, 0, 1, offsetX, offsetY);
                
                requestAnimationFrame(shake);
            } else {
                this.ctx.setTransform(originalTransform);
            }
        };
        
        shake();
    }
    
    // Matrix-style digital noise
    renderDigitalNoise(intensity = 0.1) {
        this.ctx.save();
        this.ctx.globalAlpha = intensity;
        
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 2 + 1;
            
            this.ctx.fillStyle = this.currentTheme.primary;
            this.ctx.fillRect(x, y, size, size);
        }
        
        this.ctx.restore();
    }
    
    // Get current effect status
    getEffectStatus() {
        return {
            activeEffects: this.effects.length,
            lightningBolts: this.lightningBolts.length,
            waves: this.waves.length,
            glitchLevel: this.glitchLevel,
            pulseActive: this.pulseRadius > 0,
            scanlinePosition: this.scanlinePosition
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EffectsEngine;
}