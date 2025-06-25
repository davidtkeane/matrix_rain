// Ultimate Matrix Engine - Advanced Matrix rain with incredible effects
// Removed face system, focused on amazing Matrix visuals and colors

class MatrixEngine {
    constructor() {
        // Get canvas elements
        this.matrixCanvas = document.getElementById('matrixCanvas');
        this.effectsCanvas = document.getElementById('effectsCanvas');
        this.matrixCtx = this.matrixCanvas.getContext('2d');
        this.effectsCtx = this.effectsCanvas.getContext('2d');
        
        // Initialize systems
        this.setupCanvas();
        this.initializeMatrix();
        this.initializeEffects();
        this.initializeThemes();
        
        // Start the engine
        this.startEngine();
        
        console.log('Ultimate Matrix Engine initialized successfully');
    }
    
    setupCanvas() {
        const updateSize = () => {
            // Get true viewport dimensions
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            
            // Set canvas dimensions to full screen
            this.matrixCanvas.width = this.width;
            this.matrixCanvas.height = this.height;
            this.effectsCanvas.width = this.width;
            this.effectsCanvas.height = this.height;
            
            // Update canvas styles to ensure full coverage
            this.matrixCanvas.style.width = this.width + 'px';
            this.matrixCanvas.style.height = this.height + 'px';
            this.effectsCanvas.style.width = this.width + 'px';
            this.effectsCanvas.style.height = this.height + 'px';
            
            console.log(`Canvas resized to: ${this.width}x${this.height}`);
        };
        
        updateSize();
        window.addEventListener('resize', updateSize);
    }
    
    initializeMatrix() {
        // Matrix parameters
        this.fontSize = 14;
        this.columns = Math.floor(this.width / this.fontSize);
        this.rows = Math.floor(this.height / this.fontSize);
        
        // Character data
        this.chars = MATRIX_CHARACTERS.getAllChars();
        
        // Matrix rain arrays
        this.drops = [];
        this.dropSpeeds = [];
        this.charBrightness = [];
        this.charTypes = [];
        this.charColors = [];
        
        // Rain pattern
        this.currentRainPattern = RAIN_PATTERNS.normal;
        this.rainPatternIndex = 0;
        
        // Initialize arrays
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * this.rows;
            this.dropSpeeds[i] = this.getRandomSpeed();
            this.charBrightness[i] = [];
            this.charTypes[i] = [];
            this.charColors[i] = [];
            
            for (let j = 0; j < this.rows; j++) {
                this.charBrightness[i][j] = 0;
                this.charTypes[i][j] = this.getRandomChar();
                this.charColors[i][j] = 'primary';
            }
        }
        
        // Performance tracking
        this.frameCount = 0;
        this.lastFpsUpdate = Date.now();
        this.fps = 0;
        this.activeCharCount = 0;
        
        console.log(`Matrix initialized: ${this.columns}x${this.rows} grid`);
    }
    
    initializeEffects() {
        // Initialize effects engine
        this.effectsEngine = new EffectsEngine(this.effectsCanvas, this.effectsCtx);
        
        // Auto-effect timer
        this.autoEffectsEnabled = true;
        this.lastEffectTime = Date.now();
        this.effectInterval = 5000 + Math.random() * 10000; // 5-15 seconds
        
        console.log('Effects system initialized');
    }
    
    initializeThemes() {
        // Theme management
        this.currentThemeIndex = 0;
        this.themes = COLOR_THEMES.getAllThemes();
        this.currentTheme = this.themes[0];
        this.transitionProgress = 0;
        this.isTransitioning = false;
        
        // Update effects engine theme
        this.effectsEngine.setTheme(this.currentTheme);
        
        // Update UI
        this.updateThemeDisplay();
        
        console.log('Theme system initialized with', this.themes.length, 'themes');
    }    
    // Get random character with weighted selection
    getRandomChar() {
        // Favor Matrix-style characters based on current theme
        const rand = Math.random();
        if (this.currentTheme.name === 'cyberpunk') {
            if (rand < 0.3) return MATRIX_CHARACTERS.getRandomChar('binary');
            if (rand < 0.6) return MATRIX_CHARACTERS.getRandomChar('hex');
            return MATRIX_CHARACTERS.getRandomChar('matrixSymbols');
        } else if (this.currentTheme.name === 'ghost') {
            if (rand < 0.5) return MATRIX_CHARACTERS.getRandomChar('ascii');
            return MATRIX_CHARACTERS.getRandomChar('binary');
        } else {
            // Default Matrix distribution
            if (rand < 0.4) return MATRIX_CHARACTERS.getRandomChar('katakana');
            if (rand < 0.7) return MATRIX_CHARACTERS.getRandomChar('ascii');
            if (rand < 0.85) return MATRIX_CHARACTERS.getRandomChar('binary');
            return MATRIX_CHARACTERS.getRandomChar('matrixSymbols');
        }
    }
    
    // Get random speed based on current rain pattern
    getRandomSpeed() {
        const pattern = this.currentRainPattern;
        return pattern.speed.min + Math.random() * (pattern.speed.max - pattern.speed.min);
    }
    
    // Main matrix drawing function
    drawMatrix() {
        // Create fade effect with theme background
        this.matrixCtx.fillStyle = this.currentTheme.background;
        this.matrixCtx.globalAlpha = 0.05;
        this.matrixCtx.fillRect(0, 0, this.width, this.height);
        this.matrixCtx.globalAlpha = 1.0;
        
        this.matrixCtx.font = `${this.fontSize}px monospace`;
        this.activeCharCount = 0;
        
        // Draw matrix characters
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.charBrightness[i][j] > 0.01) {
                    this.activeCharCount++;
                    
                    // Get character for this position
                    let char = this.charTypes[i][j];
                    let brightness = this.charBrightness[i][j];
                    let colorType = this.charColors[i][j];
                    
                    // Apply color based on brightness and position
                    let color;
                    if (brightness > 0.8) {
                        color = this.currentTheme.highlight;
                    } else if (brightness > 0.5) {
                        color = this.currentTheme.primary;
                    } else {
                        color = this.currentTheme.secondary;
                    }
                    
                    // Special color effects
                    if (colorType === 'highlight') {
                        color = this.currentTheme.highlight;
                    } else if (colorType === 'glow') {
                        color = this.currentTheme.glow;
                    }
                    
                    // Set final color with brightness
                    const alpha = Math.min(1.0, brightness);
                    if (color.startsWith('rgba')) {
                        // Replace alpha in rgba string
                        color = color.replace(/[\d\.]+\)$/g, alpha + ')');
                    } else {
                        // Convert to rgba
                        const rgb = COLOR_THEMES.getRGB(color);
                        color = rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
                    }
                    
                    this.matrixCtx.fillStyle = color;
                    
                    // Add glow effect for bright characters
                    if (brightness > 0.7) {
                        this.matrixCtx.shadowColor = this.currentTheme.primary;
                        this.matrixCtx.shadowBlur = 5;
                    } else {
                        this.matrixCtx.shadowBlur = 0;
                    }
                    
                    // Draw character
                    this.matrixCtx.fillText(char, i * this.fontSize, j * this.fontSize);
                    
                    // Fade character over time
                    this.charBrightness[i][j] *= 0.95;
                    
                    // Change character occasionally
                    if (Math.random() < this.currentRainPattern.characterChange) {
                        this.charTypes[i][j] = this.getRandomChar();
                    }
                }
            }
            
            // Add new characters based on rain pattern density
            if (Math.random() < this.currentRainPattern.density) {
                this.charBrightness[i][0] = 1.0;
                this.charTypes[i][0] = this.getRandomChar();
                this.charColors[i][0] = Math.random() > 0.9 ? 'highlight' : 'primary';
            }
            
            // Move drops down
            this.drops[i] += this.dropSpeeds[i];
            if (this.drops[i] > this.rows) {
                this.drops[i] = 0;
                this.dropSpeeds[i] = this.getRandomSpeed();
            }
            
            // Create trailing effect
            const dropRow = Math.floor(this.drops[i]);
            if (dropRow < this.rows) {
                this.charBrightness[i][dropRow] = Math.max(this.charBrightness[i][dropRow], 1.0);
                this.charTypes[i][dropRow] = this.getRandomChar();
                
                // Lead character is brighter
                this.charColors[i][dropRow] = 'highlight';
            }
        }
        
        // Clear shadow for next frame
        this.matrixCtx.shadowBlur = 0;
    }
    
    // Update all systems
    update() {
        // Update effects
        this.effectsEngine.update();
        
        // Handle auto-effects
        if (this.autoEffectsEnabled) {
            const now = Date.now();
            if (now - this.lastEffectTime > this.effectInterval) {
                this.effectsEngine.triggerRandomEffect();
                this.lastEffectTime = now;
                this.effectInterval = 5000 + Math.random() * 10000; // Reset interval
            }
        }
        
        // Update theme transition
        this.updateThemeTransition();
        
        // Update debug info
        this.updateDebugInfo();
    }
    
    // Update theme transition animation
    updateThemeTransition() {
        if (this.isTransitioning) {
            this.transitionProgress += 0.05; // 2 second transition
            
            if (this.transitionProgress >= 1.0) {
                this.transitionProgress = 0;
                this.isTransitioning = false;
            }
        }
    }    
    // Update debug panel information
    updateDebugInfo() {
        const effectStatus = this.effectsEngine.getEffectStatus();
        
        // Update debug elements
        const fpsElement = document.getElementById('fps');
        const activeCharsElement = document.getElementById('activeChars');
        const effectLevelElement = document.getElementById('effectLevel');
        const themeElement = document.getElementById('currentTheme');
        const rainPatternElement = document.getElementById('rainPattern');
        const statusElement = document.getElementById('systemStatus');
        const effectsStatusElement = document.getElementById('effectsStatus');
        
        if (fpsElement) fpsElement.textContent = this.fps;
        if (activeCharsElement) activeCharsElement.textContent = this.activeCharCount;
        if (effectLevelElement) effectLevelElement.textContent = effectStatus.activeEffects;
        if (themeElement) themeElement.textContent = this.currentTheme.displayName;
        if (rainPatternElement) rainPatternElement.textContent = this.currentRainPattern.name;
        
        if (statusElement) {
            statusElement.textContent = 'ACTIVE - RENDERING';
        }
        
        if (effectsStatusElement) {
            const effects = [];
            if (effectStatus.lightningBolts > 0) effects.push('LIGHTNING');
            if (effectStatus.waves > 0) effects.push('WAVES');
            if (effectStatus.glitchLevel > 0) effects.push('GLITCH');
            if (effectStatus.pulseActive) effects.push('PULSE');
            
            effectsStatusElement.textContent = effects.length > 0 ? effects.join(' + ') : 'READY';
        }
    }
    
    // Calculate and update FPS
    updateFPS() {
        this.frameCount++;
        const now = Date.now();
        if (now - this.lastFpsUpdate >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsUpdate = now;
        }
    }
    
    // Update theme display
    updateThemeDisplay() {
        const themeDisplayElement = document.getElementById('themeDisplay');
        const themePreviewElement = document.querySelector('.theme-preview');
        
        if (themeDisplayElement) {
            themeDisplayElement.textContent = this.currentTheme.displayName;
            themeDisplayElement.style.color = this.currentTheme.primary;
        }
        
        if (themePreviewElement) {
            themePreviewElement.style.background = `linear-gradient(45deg, ${this.currentTheme.primary}, ${this.currentTheme.secondary})`;
        }
    }
    
    // Main animation loop
    animate() {
        // Clear effects canvas
        this.effectsCtx.clearRect(0, 0, this.width, this.height);
        
        // Draw matrix rain
        this.drawMatrix();
        
        // Draw effects
        this.effectsEngine.render();
        
        // Update systems
        this.update();
        this.updateFPS();
        
        requestAnimationFrame(() => this.animate());
    }
    
    // Start the engine
    startEngine() {
        this.animate();
        
        // Update status
        const statusElement = document.getElementById('systemStatus');
        if (statusElement) {
            statusElement.textContent = 'ACTIVE - RENDERING';
        }
        
        console.log('Ultimate Matrix Engine started');
    }
    
    // === PUBLIC METHODS ===
    
    // Switch color theme
    switchColorTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.currentTheme = this.themes[this.currentThemeIndex];
        
        // Update effects engine theme
        this.effectsEngine.setTheme(this.currentTheme);
        
        // Update display
        this.updateThemeDisplay();
        
        // Start transition animation
        this.isTransitioning = true;
        this.transitionProgress = 0;
        
        // Trigger theme change effect
        this.effectsEngine.triggerPulse();
        this.effectsEngine.triggerGlitch(0.4);
        
        console.log(`Theme switched to: ${this.currentTheme.displayName}`);
    }
    
    // Switch rain pattern
    switchRainPattern() {
        const patterns = Object.values(RAIN_PATTERNS);
        this.rainPatternIndex = (this.rainPatternIndex + 1) % patterns.length;
        this.currentRainPattern = patterns[this.rainPatternIndex];
        
        // Update all drop speeds
        for (let i = 0; i < this.columns; i++) {
            this.dropSpeeds[i] = this.getRandomSpeed();
        }
        
        // Trigger wave effect to show change
        this.effectsEngine.triggerWave();
        
        console.log(`Rain pattern switched to: ${this.currentRainPattern.name}`);
    }
    
    // Trigger lightning effect
    triggerLightning() {
        this.effectsEngine.triggerLightning();
    }
    
    // Trigger wave effect
    triggerWave() {
        this.effectsEngine.triggerWave();
    }
    
    // Trigger glitch effect
    triggerGlitch() {
        this.effectsEngine.triggerGlitch(0.8);
    }
    
    // Reset entire matrix
    resetMatrix() {
        // Clear all character brightness
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.charBrightness[i][j] = 0;
            }
            this.drops[i] = Math.random() * this.rows;
            this.dropSpeeds[i] = this.getRandomSpeed();
        }
        
        // Reset theme to first one
        this.currentThemeIndex = 0;
        this.currentTheme = this.themes[0];
        this.effectsEngine.setTheme(this.currentTheme);
        this.updateThemeDisplay();
        
        // Reset rain pattern
        this.rainPatternIndex = 0;
        this.currentRainPattern = RAIN_PATTERNS.normal;
        
        // Trigger reset effect
        this.effectsEngine.triggerPulse();
        
        console.log('Matrix reset to defaults');
    }
    
    // Enable/disable auto-effects
    toggleAutoEffects() {
        this.autoEffectsEnabled = !this.autoEffectsEnabled;
        console.log(`Auto-effects: ${this.autoEffectsEnabled ? 'enabled' : 'disabled'}`);
    }
    
    // Get current engine status
    getStatus() {
        return {
            engineRunning: true,
            canvasSize: { width: this.width, height: this.height },
            matrixGrid: { columns: this.columns, rows: this.rows },
            currentTheme: this.currentTheme.displayName,
            rainPattern: this.currentRainPattern.name,
            effects: this.effectsEngine.getEffectStatus(),
            fps: this.fps,
            activeCharacters: this.activeCharCount,
            autoEffects: this.autoEffectsEnabled
        };
    }
}

// Global variable for engine instance
let matrixEngine = null;

// Initialize engine when page loads
window.addEventListener('load', () => {
    try {
        matrixEngine = new MatrixEngine();
        console.log('Ultimate Matrix System loaded successfully');
    } catch (error) {
        console.error('Failed to initialize Matrix Engine:', error);
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MatrixEngine;
}