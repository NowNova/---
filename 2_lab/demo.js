const Color = require('./color');
const Printer = require('./printer');

function demo() {

    console.clear();

    try {
        Printer.print('A B C', Color.RED, { x: 5, y: 2 }, '#', 'block');
        Printer.print('H E L L O', Color.GREEN, { x: 20, y: 16 }, '@', 'block');
        Printer.print('W O R L D', Color.CYAN, { x: 75, y: 16 }, '+', 'block');


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