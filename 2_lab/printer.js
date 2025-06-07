const Color = require('./color');
const FontLoader = require('./font-loader');

class Printer {
    constructor(color = Color.WHITE, position = { x: 0, y: 0 }, symbol = '*', font = 'block') {
        this.color = color;
        this.position = position;
        this.symbol = symbol;
        this.font = FontLoader.load(font);
        this.originalPosition = { ...position };
    }

    static print(text, color = Color.WHITE, position = { x: 0, y: 0 }, symbol = '*', font = 'block') {
        const printer = new Printer(color, position, symbol, font);
        printer.print(text);
    }

    print(text) {
        const fontData = this.font;
        const lines = [];
        
        for (let i = 0; i < 5; i++) {
            lines.push('');
        }

        for (const char of text.toUpperCase()) {
            const charPattern = fontData[char] || fontData[' '];
            
            for (let i = 0; i < charPattern.length; i++) {
                const patternLine = charPattern[i].replace(/\*/g, this.symbol);
                lines[i] += patternLine;
            }
        }

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const yPos = this.position.y + i;
            
            process.stdout.write(`\x1b[${yPos};${this.position.x}H`);
            process.stdout.write(`${this.color}${line}${Color.RESET}`);
        }

        this.position.y += lines.length;
    }

    resetPosition() {
        this.position = { ...this.originalPosition };
    }
    
    static createContext(color, position, symbol, font = 'block') {
    return {
        printer: new Printer(color, position, symbol, font)
    };
}
}

module.exports = Printer;