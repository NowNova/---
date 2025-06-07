const fs = require('fs');
const path = require('path');

class FontLoader {
    static load(fontName) {
        try {
            const fontPath = path.join(__dirname, 'fonts', `${fontName}.json`);
            const fontData = fs.readFileSync(fontPath, 'utf8');
            return JSON.parse(fontData);
        } catch (error) {
            throw new Error(`Failed to load font ${fontName}: ${error.message}`);
        }
    }
}

module.exports = FontLoader;