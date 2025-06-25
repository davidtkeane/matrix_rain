// Controls and User Interaction Module
// Enhanced controls for Ultimate Matrix System

// Global control functions
function toggleDebug() {
    const panel = document.getElementById('debugPanel');
    if (panel) {
        const isVisible = panel.style.display !== 'none';
        panel.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            // Add entrance animation
            panel.classList.add('matrix-loading');
            setTimeout(() => panel.classList.remove('matrix-loading'), 500);
        }
    }
}

// Enhanced keyboard event handler
document.addEventListener('keydown', (e) => {
    if (!matrixEngine) return;
    
    switch(e.key.toLowerCase()) {
        case ' ':
            e.preventDefault();
            matrixEngine.switchColorTheme();
            break;
            
        case 't':
        case 'c':
            matrixEngine.switchColorTheme();
            break;
            
        case 'l':
            matrixEngine.triggerLightning();
            break;
            
        case 'w':
            matrixEngine.triggerWave();
            break;
            
        case 'g':
            matrixEngine.triggerGlitch();
            break;
            
        case 'p':
            matrixEngine.switchRainPattern();
            break;
            
        case 'r':
            matrixEngine.resetMatrix();
            break;
            
        case 'd':
            toggleDebug();
            break;
            
        case 'a':
            matrixEngine.toggleAutoEffects();
            break;
            
        case '1':
            // Quick switch to specific themes
            matrixEngine.currentThemeIndex = 0;
            matrixEngine.switchColorTheme();
            break;
            
        case '2':
            matrixEngine.currentThemeIndex = 1;
            matrixEngine.switchColorTheme();
            break;
            
        case '3':
            matrixEngine.currentThemeIndex = 2;
            matrixEngine.switchColorTheme();
            break;
            
        case '4':
            matrixEngine.currentThemeIndex = 3;
            matrixEngine.switchColorTheme();
            break;
            
        case '5':
            matrixEngine.currentThemeIndex = 4;
            matrixEngine.switchColorTheme();
            break;
            
        case '6':
            matrixEngine.currentThemeIndex = 5;
            matrixEngine.switchColorTheme();
            break;
            
        case 'escape':
            // Emergency reset
            matrixEngine.resetMatrix();
            break;
            
        case 'f':
            // Fullscreen toggle
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
            break;
            
        default:
            // Trigger random effect for any other key
            if (e.key.length === 1) {
                matrixEngine.effectsEngine.triggerRandomEffect();
            }
            break;
    }
});

// Enhanced mouse interactions
document.addEventListener('click', (e) => {
    if (matrixEngine) {
        // Create wave effect at click position
        const rect = matrixEngine.effectsCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        matrixEngine.effectsEngine.createWave(x, y, 0.8);
        
        // Small chance for lightning
        if (Math.random() < 0.1) {
            matrixEngine.triggerLightning();
        }
    }
});

// Mouse movement creates subtle effects
let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove < 100) return; // Throttle
    lastMouseMove = now;
    
    if (matrixEngine && Math.random() < 0.01) {
        // Very subtle effects on mouse movement
        const rect = matrixEngine.effectsCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Small pulse effect
        matrixEngine.effectsEngine.createWave(x, y, 0.2);
    }
});

// Touch support for mobile devices
document.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent zoom
    
    if (matrixEngine) {
        const touch = e.touches[0];
        const rect = matrixEngine.effectsCanvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        // Create wave at touch point
        matrixEngine.effectsEngine.createWave(x, y, 1.0);
        
        // Switch theme on touch
        if (e.touches.length === 1) {
            setTimeout(() => matrixEngine.switchColorTheme(), 100);
        }
    }
});

// Multi-touch gestures
document.addEventListener('touchend', (e) => {
    if (matrixEngine && e.changedTouches.length >= 2) {
        // Two finger tap triggers lightning
        matrixEngine.triggerLightning();
    }
});

// Window focus/blur handlers for performance
window.addEventListener('focus', () => {
    if (matrixEngine) {
        matrixEngine.autoEffectsEnabled = true;
        console.log('Matrix system resumed');
    }
});

window.addEventListener('blur', () => {
    if (matrixEngine) {
        matrixEngine.autoEffectsEnabled = false;
        console.log('Matrix system paused');
    }
});

// Enhanced button effects
document.addEventListener('DOMContentLoaded', () => {
    // Add click effects to all control buttons
    document.querySelectorAll('.control-button').forEach(button => {
        button.addEventListener('click', function() {
            // Visual feedback
            this.classList.add('ui-glitch');
            setTimeout(() => this.classList.remove('ui-glitch'), 300);
            
            // Trigger small effect
            if (matrixEngine) {
                matrixEngine.effectsEngine.triggerGlitch(0.2);
            }
        });
        
        // Hover effects
        button.addEventListener('mouseenter', function() {
            if (matrixEngine && Math.random() < 0.3) {
                matrixEngine.effectsEngine.renderDigitalNoise(0.05);
            }
        });
    });
    
    // Auto-hide debug panel after showing briefly
    setTimeout(() => {
        const debugPanel = document.getElementById('debugPanel');
        if (debugPanel && debugPanel.style.display !== 'none') {
            setTimeout(() => {
                debugPanel.style.display = 'none';
            }, 3000);
        }
    }, 2000);
});

// Konami code for special effects
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiPosition = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiPosition]) {
        konamiPosition++;
        
        if (konamiPosition === konamiCode.length) {
            // Konami code activated - ULTIMATE EFFECTS!
            console.log('KONAMI CODE ACTIVATED - ULTIMATE MATRIX MODE!');
            
            if (matrixEngine) {
                // Massive effect sequence
                matrixEngine.triggerLightning();
                setTimeout(() => matrixEngine.triggerWave(), 200);
                setTimeout(() => matrixEngine.triggerGlitch(), 400);
                setTimeout(() => matrixEngine.effectsEngine.triggerPulse(), 600);
                setTimeout(() => matrixEngine.triggerLightning(), 800);
                
                // Rapid theme cycling
                for (let i = 0; i < 6; i++) {
                    setTimeout(() => matrixEngine.switchColorTheme(), i * 300);
                }
                
                // Screen shake
                matrixEngine.effectsEngine.triggerScreenShake(10, 1000);
            }
            
            // Update status
            const statusElement = document.getElementById('systemStatus');
            if (statusElement) {
                statusElement.textContent = 'ULTIMATE MATRIX MODE ACTIVATED';
                setTimeout(() => {
                    statusElement.textContent = 'ACTIVE - RENDERING';
                }, 5000);
            }
            
            konamiPosition = 0;
        }
    } else {
        konamiPosition = 0;
    }
});

// Visibility API for performance optimization
document.addEventListener('visibilitychange', () => {
    if (matrixEngine) {
        if (document.visibilityState === 'visible') {
            matrixEngine.autoEffectsEnabled = true;
        } else {
            matrixEngine.autoEffectsEnabled = false;
        }
    }
});

// Error handling with style
window.addEventListener('error', (e) => {
    console.error('Matrix System Error:', e.error);
    
    // Visual error indication
    if (matrixEngine) {
        try {
            matrixEngine.effectsEngine.triggerGlitch(1.0);
            matrixEngine.effectsEngine.triggerScreenShake(20, 500);
            
            // Error recovery attempt
            setTimeout(() => {
                matrixEngine.resetMatrix();
                console.log('Attempted automatic error recovery');
            }, 1000);
        } catch (recoveryError) {
            console.error('Recovery failed:', recoveryError);
        }
    }
});

// Performance monitoring
let performanceWarned = false;
setInterval(() => {
    if (matrixEngine && matrixEngine.fps < 30 && !performanceWarned) {
        console.warn('Performance warning: FPS below 30');
        performanceWarned = true;
        
        // Trigger performance optimization
        if (matrixEngine.autoEffectsEnabled) {
            matrixEngine.effectInterval = Math.max(matrixEngine.effectInterval * 1.5, 15000);
            console.log('Auto-effects interval increased for performance');
        }
    }
}, 5000);

// Console commands for advanced users
window.matrixCommands = {
    status: () => matrixEngine ? matrixEngine.getStatus() : 'Engine not initialized',
    reset: () => matrixEngine ? matrixEngine.resetMatrix() : 'Engine not initialized',
    theme: (index) => {
        if (matrixEngine) {
            if (index !== undefined && index >= 0 && index < matrixEngine.themes.length) {
                matrixEngine.currentThemeIndex = index;
                matrixEngine.switchColorTheme();
            } else {
                matrixEngine.switchColorTheme();
            }
        }
    },
    lightning: () => matrixEngine ? matrixEngine.triggerLightning() : 'Engine not initialized',
    wave: () => matrixEngine ? matrixEngine.triggerWave() : 'Engine not initialized',
    glitch: (intensity = 0.8) => matrixEngine ? matrixEngine.effectsEngine.triggerGlitch(intensity) : 'Engine not initialized',
    pattern: () => matrixEngine ? matrixEngine.switchRainPattern() : 'Engine not initialized',
    autoEffects: (enable) => {
        if (matrixEngine) {
            if (enable !== undefined) {
                matrixEngine.autoEffectsEnabled = enable;
            } else {
                matrixEngine.toggleAutoEffects();
            }
        }
    },
    ultimate: () => {
        // Trigger ultimate effect sequence
        if (matrixEngine) {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => matrixEngine.effectsEngine.triggerRandomEffect(), i * 200);
            }
        }
    },
    help: () => {
        console.log(`
Ultimate Matrix System - Console Commands:
- matrixCommands.status() - Get system status
- matrixCommands.reset() - Reset to defaults
- matrixCommands.theme(index) - Switch theme (0-5)
- matrixCommands.lightning() - Trigger lightning
- matrixCommands.wave() - Trigger wave effect
- matrixCommands.glitch(intensity) - Trigger glitch (0-1)
- matrixCommands.pattern() - Switch rain pattern
- matrixCommands.autoEffects(true/false) - Toggle auto effects
- matrixCommands.ultimate() - ULTIMATE EFFECT SEQUENCE!
- matrixCommands.help() - Show this help

Keyboard Controls:
- SPACEBAR/T: Switch theme
- L: Lightning    W: Wave    G: Glitch
- P: Rain pattern    R: Reset    D: Debug
- A: Auto effects    F: Fullscreen
- 1-6: Direct theme selection
- ESC: Emergency reset
- KONAMI CODE: Ultimate mode!
- CLICK: Wave at cursor
- Any key: Random effect
        `);
    }
};

// Show available commands in console
console.log(`
🔥 ULTIMATE MATRIX SYSTEM LOADED! 🔥
Type "matrixCommands.help()" for all commands
Press SPACEBAR to switch themes!
`);

console.log('Ultimate Matrix Controls loaded successfully');
