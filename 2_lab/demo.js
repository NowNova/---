const Color = require('./color');
const Printer = require('./printer');

function demo() {

    console.clear();

    try {
        Printer.print('ABC', Color.RED, { x: 5, y: 2 }, '#', 'block');
        Printer.print('HELLO', Color.GREEN, { x: 20, y: 10 }, '@', 'block');
        Printer.print('WORLD', Color.CYAN, { x: 20, y: 16 }, '+', 'block');


        const context = Printer.createContext(Color.CYAN, { x: 40, y: 5 }, '$', 'block');
        try {
            context.printer.print('CONTEXT');
        } 
        finally {
            context.printer.resetPosition();
        }
        
        setTimeout(() => {
            console.log(Color.RESET);
            process.stdout.write('\x1b[H');
        }, 5000);
    } catch (error) {
        console.error('Error:', error);
        console.log(Color.RESET);
        process.stdout.write('\x1b[H');
    }
}
demo();