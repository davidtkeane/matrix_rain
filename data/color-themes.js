// Color Themes for Ultimate Matrix System
// Comprehensive color schemes with advanced effects

const COLOR_THEMES = {
    matrix: {
        id: 0,
        name: "Matrix",
        displayName: "MATRIX",
        background: "rgba(0, 0, 0, 1)",
        primary: "#00ff00",
        secondary: "#008800",
        highlight: "#ffffff",
        glow: "rgba(0, 255, 0, 0.8)",
        lightning: "#ffffff",
        wave: "rgba(0, 255, 0, 0.3)",
        scanline: "rgba(0, 255, 0, 0.1)"
    },
    
    blue: {
        id: 1,
        name: "blue",
        displayName: "BLUE MATRIX",
        background: "rgba(0, 0, 20, 1)",
        primary: "#0080ff",
        secondary: "#0040aa",
        highlight: "#80c0ff",
        glow: "rgba(0, 128, 255, 0.8)",
        lightning: "#80c0ff",
        wave: "rgba(0, 128, 255, 0.3)",
        scanline: "rgba(0, 128, 255, 0.1)"
    },
    
    red: {
        id: 2,
        name: "red", 
        displayName: "RED ALERT",
        background: "rgba(20, 0, 0, 1)",
        primary: "#ff0040",
        secondary: "#aa0020",
        highlight: "#ff8080",
        glow: "rgba(255, 0, 64, 0.8)",
        lightning: "#ff8080",
        wave: "rgba(255, 0, 64, 0.3)",
        scanline: "rgba(255, 0, 64, 0.1)"
    },
    
    cyberpunk: {
        id: 3,
        name: "cyberpunk",
        displayName: "CYBERPUNK",
        background: "rgba(10, 10, 35, 1)",
        primary: "#ff006e",
        secondary: "#8338ec",
        highlight: "#06ffa5",
        glow: "rgba(255, 0, 110, 0.8)",
        lightning: "#06ffa5",
        wave: "rgba(131, 56, 236, 0.3)",
        scanline: "rgba(255, 0, 110, 0.1)"
    },
    
    ghost: {
        id: 4,
        name: "ghost",
        displayName: "GHOST PROTOCOL",
        background: "rgba(15, 15, 15, 1)",
        primary: "#ffffff",
        secondary: "#aaaaaa",
        highlight: "#ffffff",
        glow: "rgba(255, 255, 255, 0.6)",
        lightning: "#ffffff",
        wave: "rgba(255, 255, 255, 0.2)",
        scanline: "rgba(255, 255, 255, 0.1)"
    },
    
    neon: {
        id: 5,
        name: "neon",
        displayName: "NEON DREAMS",
        background: "rgba(5, 0, 15, 1)",
        primary: "#39ff14",
        secondary: "#ff073a",
        highlight: "#00d4ff",
        glow: "rgba(57, 255, 20, 0.9)",
        lightning: "#00d4ff",
        wave: "rgba(255, 7, 58, 0.4)",
        scanline: "rgba(57, 255, 20, 0.1)"
    },
    
    // Get all theme names for cycling
    getAllThemes: function() {
        return [this.matrix, this.blue, this.red, this.cyberpunk, this.ghost, this.neon];
    },
    
    // Get theme by name
    getTheme: function(themeName) {
        return this[themeName] || this.matrix;
    },
    
    // Get next theme in cycle
    getNextTheme: function(currentTheme) {
        const themes = this.getAllThemes();
        const currentIndex = themes.findIndex(theme => theme.name === currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        return themes[nextIndex];
    },
    
    // Generate RGB color from theme color
    getRGB: function(colorString, alpha = 1) {
        // Convert hex to RGB
        if (colorString.startsWith('#')) {
            const hex = colorString.slice(1);
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            return `rgb(${r}, ${g}, ${b})`;
        }
        return colorString;
    },
    
    // Generate gradient for effects
    createGradient: function(ctx, theme, x1, y1, x2, y2) {
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, theme.background);
        gradient.addColorStop(0.5, theme.primary);
        gradient.addColorStop(1, theme.highlight);
        return gradient;
    }
};

// Rain patterns for different effects
const RAIN_PATTERNS = {
    normal: {
        name: "Normal",
        speed: { min: 0.3, max: 0.7 },
        density: 0.025,
        characterChange: 0.1
    },
    
    storm: {
        name: "Digital Storm", 
        speed: { min: 0.8, max: 1.5 },
        density: 0.05,
        characterChange: 0.3
    },
    
    cascade: {
        name: "Cascade",
        speed: { min: 0.1, max: 0.3 },
        density: 0.015,
        characterChange: 0.05
    },
    
    chaos: {
        name: "Chaos Mode",
        speed: { min: 0.5, max: 2.0 },
        density: 0.08,
        characterChange: 0.5
    },
    
    wave: {
        name: "Wave Pattern",
        speed: { min: 0.4, max: 0.8 },
        density: 0.03,
        characterChange: 0.2
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COLOR_THEMES, RAIN_PATTERNS };
}