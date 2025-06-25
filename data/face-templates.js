// Face Templates Data
// Pre-defined face patterns and configurations

const FACE_TEMPLATES = {
    // Face type configurations
    types: {
        ADULT_MALE: {
            id: 0,
            name: "Adult Male",
            proportions: {
                faceWidth: 120,
                faceHeight: 160,
                eyeWidth: 15,
                eyeHeight: 8,
                eyeSeparation: 50,
                noseLength: 20,
                mouthWidth: 25
            },
            features: {
                jawStrength: 1.2,
                cheekbones: 0.8,
                browRidge: 1.1
            }
        },
        
        ADULT_FEMALE: {
            id: 1,
            name: "Adult Female",
            proportions: {
                faceWidth: 110,
                faceHeight: 155,
                eyeWidth: 16,
                eyeHeight: 9,
                eyeSeparation: 45,
                noseLength: 18,
                mouthWidth: 22
            },
            features: {
                jawStrength: 0.8,
                cheekbones: 1.3,
                browRidge: 0.7
            }
        },
        
        CHILD: {
            id: 2,
            name: "Child",
            proportions: {
                faceWidth: 90,
                faceHeight: 120,
                eyeWidth: 18,
                eyeHeight: 12,
                eyeSeparation: 35,
                noseLength: 12,
                mouthWidth: 18
            },
            features: {
                jawStrength: 0.5,
                cheekbones: 0.6,
                browRidge: 0.4
            }
        },
        
        ELDER: {
            id: 3,
            name: "Elder",
            proportions: {
                faceWidth: 125,
                faceHeight: 165,
                eyeWidth: 14,
                eyeHeight: 7,
                eyeSeparation: 52,
                noseLength: 22,
                mouthWidth: 20
            },
            features: {
                jawStrength: 1.0,
                cheekbones: 1.1,
                browRidge: 1.3,
                wrinkles: true
            }
        }
    },    
    // Emergence patterns for different face reveal styles
    emergencePatterns: {
        CLASSIC: {
            name: "Classic Emergence",
            phases: [
                { name: "HIDDEN", duration: 0, intensity: 0 },
                { name: "FORMING", duration: 2000, intensity: 0.3 },
                { name: "EMERGING", duration: 1500, intensity: 0.7 },
                { name: "BREAKING_THROUGH", duration: 1000, intensity: 1.2 },
                { name: "FULLY_EMERGED", duration: 3000, intensity: 1.0 }
            ]
        },
        
        SLOW_REVEAL: {
            name: "Slow Reveal",
            phases: [
                { name: "HIDDEN", duration: 0, intensity: 0 },
                { name: "FORMING", duration: 4000, intensity: 0.2 },
                { name: "EMERGING", duration: 3000, intensity: 0.5 },
                { name: "BREAKING_THROUGH", duration: 2000, intensity: 1.0 },
                { name: "FULLY_EMERGED", duration: 5000, intensity: 1.0 }
            ]
        },
        
        SUDDEN_APPEARANCE: {
            name: "Sudden Appearance",
            phases: [
                { name: "HIDDEN", duration: 0, intensity: 0 },
                { name: "FORMING", duration: 500, intensity: 0.1 },
                { name: "EMERGING", duration: 300, intensity: 0.5 },
                { name: "BREAKING_THROUGH", duration: 200, intensity: 1.5 },
                { name: "FULLY_EMERGED", duration: 2000, intensity: 1.0 }
            ]
        }
    },
    
    // Character matrices for specific facial features
    characterMappings: {
        // Characters that work well for face outlines
        outline: ['○', '◯', '●', '⭕', '🔴', '⚫', '⚪'],
        
        // Characters for eyes
        eyes: ['●', '◉', '⚫', '👁', '⊙', '◎', '○'],
        
        // Characters for nose area
        nose: ['|', '∣', '│', '▌', '▍', '▎', '▏'],
        
        // Characters for mouth
        mouth: ['—', '―', '─', '━', '▬', '▭', '■'],
        
        // Characters for general facial features
        features: ['▓', '▒', '░', '█', '▌', '▍', '▎', '▏']
    },
    
    // Mathematical curves for natural face generation
    faceCurves: {
        // Golden ratio proportions
        goldenRatio: 1.618,
        
        // Face outline curve parameters
        outline: {
            ellipseA: 1.0,    // Horizontal radius multiplier
            ellipseB: 1.3,    // Vertical radius multiplier
            cheekCurve: 0.1   // Cheek curve intensity
        },
        
        // Eye positioning using facial thirds
        eyes: {
            verticalPosition: 0.4,  // From top of face
            horizontalSpacing: 0.3   // Distance from center
        },
        
        // Nose positioning
        nose: {
            verticalPosition: 0.6,  // From top of face
            length: 0.15           // Relative to face height
        },
        
        // Mouth positioning
        mouth: {
            verticalPosition: 0.8,  // From top of face
            width: 0.2             // Relative to face width
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FACE_TEMPLATES;
}