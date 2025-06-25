// Matrix Character Sets
// This file contains all the character sets used in the Matrix rain effect

const MATRIX_CHARACTERS = {
    // Standard ASCII characters
    ascii: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    
    // Japanese Katakana (classic Matrix style)
    katakana: 'ﾊﾟｰﾃｨｸﾚﾇﾒｼﾄｽﾅﾆｸﾎﾐﾑﾒｷﾗｽﾀﾝﾁﾄﾓﾜｹﾕﾈﾐｳｼﾁﾋｲﾛｽﾔﾈｳｾｺﾝ',
    
    // Full-width Katakana
    katakanaFull: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    
    // Japanese Kanji numbers
    kanji: '日月火水木金土一二三四五六七八九十',
    
    // Binary
    binary: '01',
    
    // Hexadecimal
    hex: '0123456789ABCDEF',
    
    // Special symbols
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    
    // Matrix-specific symbols
    matrixSymbols: '←↑→↓↖↗↘↙⟨⟩⟪⟫⟬⟭⟮⟯⟰⟱⟲⟳⟴⟵⟶⟷⟸⟹⟺⟻⟼⟽⟾⟿',
    
    // Unicode mathematical symbols
    math: '∀∁∂∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑−∓∔∕∖∗∘∙√∛∜∝∞∟∠∡∢∣∤∥∦∧∨∩∪∫∬∭∮∯∰∱∲∳∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅',
    
    // Combining all sets for maximum variety
    getAllChars: function() {
        return this.ascii + this.katakana + this.katakanaFull + this.kanji + 
               this.binary + this.hex + this.symbols + this.matrixSymbols + this.math;
    },
    
    // Get specific character set by name
    getCharSet: function(setName) {
        return this[setName] || this.getAllChars();
    },
    
    // Get random character from specific set
    getRandomChar: function(setName = 'all') {
        const chars = setName === 'all' ? this.getAllChars() : this.getCharSet(setName);
        return chars[Math.floor(Math.random() * chars.length)];
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MATRIX_CHARACTERS;
}