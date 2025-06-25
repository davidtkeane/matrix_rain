// Face Emergence System
// Handles the phases and animation of face emergence from Matrix rain

class EmergenceSystem {
    constructor() {
        this.phases = {
            HIDDEN: 0,
            FORMING: 1,
            EMERGING: 2,
            BREAKING_THROUGH: 3,
            FULLY_EMERGED: 4
        };
        
        this.currentPhase = this.phases.HIDDEN;
        this.emergenceLevel = 0;
        this.phaseStartTime = 0;
        this.isActive = false;
        this.currentPattern = 'CLASSIC';
        
        // Animation parameters
        this.intensity = 0;
        this.pulseSpeed = 0.02;
        this.glitchFactor = 0;
    }
    
    // Start face emergence with specified pattern
    startEmergence(pattern = 'CLASSIC') {
        this.currentPattern = pattern;
        this.currentPhase = this.phases.FORMING;
        this.emergenceLevel = 0;
        this.phaseStartTime = Date.now();
        this.isActive = true;
        this.intensity = 0;
        
        console.log(`Starting face emergence with ${pattern} pattern`);
    }
    
    // Stop emergence and reset
    stopEmergence() {
        this.currentPhase = this.phases.HIDDEN;
        this.emergenceLevel = 0;
        this.isActive = false;
        this.intensity = 0;
        this.glitchFactor = 0;
    }
    
    // Update emergence state
    update() {
        if (!this.isActive) return;
        
        const pattern = FACE_TEMPLATES.emergencePatterns[this.currentPattern];
        const currentPhaseData = pattern.phases[this.currentPhase];
        const elapsed = Date.now() - this.phaseStartTime;
        
        // Update emergence level based on current phase
        switch (this.currentPhase) {
            case this.phases.FORMING:
                this.emergenceLevel = Math.min(0.3, elapsed / 2000 * 0.3);
                this.intensity = this.emergenceLevel;
                
                if (elapsed >= currentPhaseData.duration) {
                    this.advancePhase();
                }
                break;
                
            case this.phases.EMERGING:
                this.emergenceLevel = 0.3 + Math.min(0.4, elapsed / 1500 * 0.4);
                this.intensity = this.emergenceLevel;
                
                if (elapsed >= currentPhaseData.duration) {
                    this.advancePhase();
                }
                break;                
            case this.phases.BREAKING_THROUGH:
                this.emergenceLevel = 0.7 + Math.min(0.5, elapsed / 1000 * 0.5);
                this.intensity = this.emergenceLevel * 1.5; // Higher intensity for breaking through
                this.glitchFactor = Math.sin(elapsed * 0.01) * 0.2; // Add glitch effect
                
                if (elapsed >= currentPhaseData.duration) {
                    this.advancePhase();
                }
                break;
                
            case this.phases.FULLY_EMERGED:
                this.emergenceLevel = 1.0;
                this.intensity = 1.0 + Math.sin(elapsed * this.pulseSpeed) * 0.2; // Pulsing effect
                this.glitchFactor = 0;
                
                if (elapsed >= currentPhaseData.duration) {
                    this.stopEmergence();
                }
                break;
        }
    }
    
    // Advance to next phase
    advancePhase() {
        if (this.currentPhase < this.phases.FULLY_EMERGED) {
            this.currentPhase++;
            this.phaseStartTime = Date.now();
            
            // Update debug display
            const phaseNames = Object.keys(this.phases);
            const phaseName = phaseNames[this.currentPhase];
            const debugElement = document.getElementById('currentPhase');
            if (debugElement) {
                debugElement.textContent = phaseName;
            }
        }
    }
    
    // Calculate face character brightness based on distance and emergence state
    calculateCharacterBrightness(x, y, faceFeatures, baseBrightness) {
        if (!this.isActive) return baseBrightness;
        
        let faceIntensity = 0;
        let minDistance = Infinity;
        let nearestFeature = null;
        
        // Find closest face feature
        for (let feature of faceFeatures) {
            const distance = Math.sqrt(
                Math.pow(x - feature.x, 2) + Math.pow(y - feature.y, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                faceIntensity = feature.intensity;
                nearestFeature = feature;
            }
        }
        
        // Apply emergence effect based on distance and phase
        const maxDistance = this.getInfluenceRadius();
        
        if (minDistance < maxDistance) {
            const distanceFactor = 1 - (minDistance / maxDistance);
            const emergenceFactor = this.intensity * distanceFactor * faceIntensity;
            
            // Add glitch effect during breaking through phase
            if (this.currentPhase === this.phases.BREAKING_THROUGH) {
                const glitchBoost = this.glitchFactor * Math.random();
                return Math.min(1.5, baseBrightness + emergenceFactor + glitchBoost);
            }
            
            return Math.min(1.0, baseBrightness + emergenceFactor);
        }
        
        return baseBrightness;
    }    
    // Get influence radius based on current phase
    getInfluenceRadius() {
        switch (this.currentPhase) {
            case this.phases.FORMING:
                return 4;
            case this.phases.EMERGING:
                return 6;
            case this.phases.BREAKING_THROUGH:
                return 10;
            case this.phases.FULLY_EMERGED:
                return 8;
            default:
                return 0;
        }
    }
    
    // Get special character for face position during emergence
    getFaceCharacter(x, y, faceFeatures, defaultChar) {
        if (!this.isActive) return defaultChar;
        
        let nearestFeature = null;
        let minDistance = Infinity;
        
        // Find closest face feature
        for (let feature of faceFeatures) {
            const distance = Math.sqrt(
                Math.pow(x - feature.x, 2) + Math.pow(y - feature.y, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestFeature = feature;
            }
        }
        
        // Use feature-specific character if close enough
        if (minDistance < this.getInfluenceRadius() && nearestFeature && nearestFeature.char) {
            // Add randomness during breaking through phase
            if (this.currentPhase === this.phases.BREAKING_THROUGH && Math.random() > 0.7) {
                return MATRIX_CHARACTERS.getRandomChar('matrixSymbols');
            }
            return nearestFeature.char;
        }
        
        return defaultChar;
    }
    
    // Check if position is within face area
    isInFaceArea(x, y, faceFeatures) {
        if (!this.isActive) return false;
        
        for (let feature of faceFeatures) {
            const distance = Math.sqrt(
                Math.pow(x - feature.x, 2) + Math.pow(y - feature.y, 2)
            );
            
            if (distance < this.getInfluenceRadius()) {
                return true;
            }
        }
        
        return false;
    }
    
    // Get current emergence data for debugging
    getEmergenceData() {
        return {
            phase: Object.keys(this.phases)[this.currentPhase],
            level: this.emergenceLevel,
            intensity: this.intensity,
            active: this.isActive,
            pattern: this.currentPattern,
            glitchFactor: this.glitchFactor
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmergenceSystem;
}