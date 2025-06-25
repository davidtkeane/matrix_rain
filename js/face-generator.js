// Face Generator Module
// Generates realistic face patterns using mathematical algorithms

class FaceGenerator {
    constructor(canvasWidth, canvasHeight, fontSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = fontSize;
        this.centerX = canvasWidth / 2;
        this.centerY = canvasHeight / 2;
        this.columns = Math.floor(canvasWidth / fontSize);
        this.rows = Math.floor(canvasHeight / fontSize);
    }
    
    // Generate a complete face based on template
    generateFace(faceType = 0) {
        const template = this.getFaceTemplate(faceType);
        
        let face = {
            outline: [],
            eyes: [],
            nose: [],
            mouth: [],
            details: [],
            type: template.name,
            id: template.id
        };
        
        // Generate each facial feature
        face.outline = this.generateFaceOutline(template);
        face.eyes = this.generateEyes(template);
        face.nose = this.generateNose(template);
        face.mouth = this.generateMouth(template);
        
        // Add special features based on face type
        if (template.features.wrinkles) {
            face.details = this.generateWrinkles(template);
        } else {
            face.details = this.generateDetails(template);
        }
        
        return face;
    }
    
    // Get face template by type
    getFaceTemplate(faceType) {
        const types = Object.values(FACE_TEMPLATES.types);
        return types[faceType % types.length];
    }
    
    // Generate face outline using ellipse with variations
    generateFaceOutline(template) {
        const outline = [];
        const props = template.proportions;
        
        for (let angle = 0; angle < 360; angle += 3) {
            const rad = (angle * Math.PI) / 180;            
            // Create natural face curve with cheek variations
            const baseX = Math.cos(rad) * (props.faceWidth / 2);
            const baseY = Math.sin(rad) * (props.faceHeight / 2);
            
            // Add natural facial curves
            const cheekFactor = Math.sin(rad * 2) * 0.1 * template.features.jawStrength;
            const jawFactor = Math.sin(rad) > 0 ? template.features.jawStrength : 1.0;
            
            const x = this.centerX + baseX * jawFactor;
            const y = this.centerY + baseY * (1 + cheekFactor);
            
            outline.push({
                x: Math.floor(x / this.fontSize),
                y: Math.floor(y / this.fontSize),
                intensity: 0.8 + Math.random() * 0.2,
                char: MATRIX_CHARACTERS.getRandomChar('matrixSymbols')
            });
        }
        
        return outline;
    }
    
    // Generate realistic eyes
    generateEyes(template) {
        const eyes = [];
        const props = template.proportions;
        const eyeY = this.centerY - props.faceHeight * 0.15;
        
        // Left eye
        const leftEyeX = this.centerX - props.eyeSeparation / 2;
        eyes.push(...this.generateSingleEye(leftEyeX, eyeY, props.eyeWidth, props.eyeHeight));
        
        // Right eye
        const rightEyeX = this.centerX + props.eyeSeparation / 2;
        eyes.push(...this.generateSingleEye(rightEyeX, eyeY, props.eyeWidth, props.eyeHeight));
        
        return eyes;
    }
    
    // Generate a single eye
    generateSingleEye(centerX, centerY, width, height) {
        const eye = [];
        
        for (let x = -width; x <= width; x += 2) {
            for (let y = -height; y <= height; y += 2) {
                // Create elliptical eye shape
                if (x * x / (width * width) + y * y / (height * height) <= 1) {
                    const intensity = 1.0 - Math.abs(x) / width * 0.3;
                    
                    eye.push({
                        x: Math.floor((centerX + x) / this.fontSize),
                        y: Math.floor((centerY + y) / this.fontSize),
                        intensity: intensity,
                        char: MATRIX_CHARACTERS.getRandomChar('eyes')
                    });
                }
            }
        }
        
        return eye;
    }    
    // Generate nose
    generateNose(template) {
        const nose = [];
        const props = template.proportions;
        const noseX = this.centerX;
        const noseY = this.centerY - props.noseLength / 2;
        
        for (let y = 0; y <= props.noseLength; y += 2) {
            for (let x = -1; x <= 1; x += 1) {
                nose.push({
                    x: Math.floor((noseX + x) / this.fontSize),
                    y: Math.floor((noseY + y) / this.fontSize),
                    intensity: 0.7 + Math.random() * 0.3,
                    char: MATRIX_CHARACTERS.getRandomChar('nose')
                });
            }
        }
        
        return nose;
    }
    
    // Generate mouth with natural curve
    generateMouth(template) {
        const mouth = [];
        const props = template.proportions;
        const mouthY = this.centerY + props.faceHeight * 0.25;
        const mouthWidth = props.mouthWidth;
        
        for (let x = -mouthWidth; x <= mouthWidth; x += 2) {
            // Create smile curve
            const y = Math.sin((x / mouthWidth) * Math.PI) * 3;
            
            mouth.push({
                x: Math.floor((this.centerX + x) / this.fontSize),
                y: Math.floor((mouthY + y) / this.fontSize),
                intensity: 0.9,
                char: MATRIX_CHARACTERS.getRandomChar('mouth')
            });
        }
        
        return mouth;
    }
    
    // Generate facial details (cheeks, etc.)
    generateDetails(template) {
        const details = [];
        const props = template.proportions;
        
        // Add cheekbone highlights for female faces
        if (template.features.cheekbones > 1.0) {
            // Left cheek
            for (let i = 0; i < 8; i++) {
                details.push({
                    x: Math.floor((this.centerX - 40 + Math.random() * 15) / this.fontSize),
                    y: Math.floor((this.centerY + 5 + Math.random() * 15) / this.fontSize),
                    intensity: 0.4 + Math.random() * 0.2,
                    char: MATRIX_CHARACTERS.getRandomChar('features')
                });
            }
            
            // Right cheek
            for (let i = 0; i < 8; i++) {
                details.push({
                    x: Math.floor((this.centerX + 25 + Math.random() * 15) / this.fontSize),
                    y: Math.floor((this.centerY + 5 + Math.random() * 15) / this.fontSize),
                    intensity: 0.4 + Math.random() * 0.2,
                    char: MATRIX_CHARACTERS.getRandomChar('features')
                });
            }
        }
        
        return details;
    }    
    // Generate wrinkles for elder faces
    generateWrinkles(template) {
        const wrinkles = [];
        const props = template.proportions;
        
        // Forehead wrinkles
        for (let i = 0; i < 3; i++) {
            const y = this.centerY - props.faceHeight * 0.3 + i * 8;
            for (let x = -30; x <= 30; x += 5) {
                wrinkles.push({
                    x: Math.floor((this.centerX + x + Math.random() * 4 - 2) / this.fontSize),
                    y: Math.floor((y + Math.random() * 2 - 1) / this.fontSize),
                    intensity: 0.3 + Math.random() * 0.2,
                    char: MATRIX_CHARACTERS.getRandomChar('features')
                });
            }
        }
        
        // Eye wrinkles (crow's feet)
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 25 + Math.random() * 15;
            
            // Left eye area
            wrinkles.push({
                x: Math.floor((this.centerX - 25 + Math.cos(angle) * distance) / this.fontSize),
                y: Math.floor((this.centerY - 15 + Math.sin(angle) * distance) / this.fontSize),
                intensity: 0.2 + Math.random() * 0.2,
                char: MATRIX_CHARACTERS.getRandomChar('features')
            });
            
            // Right eye area
            wrinkles.push({
                x: Math.floor((this.centerX + 25 + Math.cos(angle) * distance) / this.fontSize),
                y: Math.floor((this.centerY - 15 + Math.sin(angle) * distance) / this.fontSize),
                intensity: 0.2 + Math.random() * 0.2,
                char: MATRIX_CHARACTERS.getRandomChar('features')
            });
        }
        
        return wrinkles;
    }
    
    // Update canvas dimensions
    updateDimensions(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.columns = Math.floor(width / this.fontSize);
        this.rows = Math.floor(height / this.fontSize);
    }
    
    // Get all face features combined
    getAllFeatures(face) {
        return [
            ...face.outline,
            ...face.eyes,
            ...face.nose,
            ...face.mouth,
            ...face.details
        ];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FaceGenerator;
}