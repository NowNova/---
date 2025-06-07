const fs = require('fs');

class ICommand {
    execute() {}
    undo() {}
}

class PrintCharCommand extends ICommand {
    constructor(keyboard, char) {
        super();
        this.type = 'PrintCharCommand';
        this._keyboard = keyboard;
        this._char = char;
    }

    execute() {
        this._keyboard.print(this._char);
        process.stdout.write(this._char);
        console.log(" --> " + this._keyboard.getOutput());
        fs.appendFileSync("output.txt", this._char.toString() + "\n");
    }

    undo() {
        this._keyboard.eraseLastChar();
        process.stdout.write(`undo '${this._char}'`);
        console.log(" --> " + this._keyboard.getOutput());
        fs.appendFileSync("output.txt", "undo\n");
    }
}

class VolumeUpCommand extends ICommand {
    constructor() {
        super();
        this.type = 'VolumeUpCommand';
    }

    execute() {
        console.log("\nvolume increased +20%");
        fs.appendFileSync("output.txt", "volume increased +20%\n");
    }

    undo() {
        console.log("\nvolume decreased +20%");
        fs.appendFileSync("output.txt", "volume decreased +20%\n");
    }
}

class VolumeDownCommand extends ICommand {
    constructor() {
        super();
        this.type = 'VolumeDownCommand';
    }

    execute() {
        console.log("\nvolume decreased -20%");
        fs.appendFileSync("output.txt", "volume decreased -20%\n");
    }

    undo() {
        console.log("\nvolume increased +20%");
        fs.appendFileSync("output.txt", "volume increased +20%\n");
    }
}

class MediaPlayerCommand extends ICommand {
    constructor() {
        super();
        this.type = 'MediaPlayerCommand';
    }

    execute() {
        console.log("\nmedia player launched");
        fs.appendFileSync("output.txt", "media player launched\n");
    }

    undo() {
        console.log("\nmedia player closed");
        fs.appendFileSync("output.txt", "media player closed\n");
    }
}

class KeyboardMemento {
    constructor(bindings) {
        this.keyBindings = {...bindings};
    }
}

class KeyboardStateSaver {
    constructor() {
        this.SAVE_FILE = "keyboard_state.json";
    }

    saveState(memento) {
        const serializedBindings = {};
        for (const [key, command] of Object.entries(memento.keyBindings)) {
            serializedBindings[key] = {
                type: command.type,
                _char: command._char
            };
        }
        const json = JSON.stringify(serializedBindings, null, 2);
        fs.writeFileSync(this.SAVE_FILE, json);
    }

    loadState() {
        if (fs.existsSync(this.SAVE_FILE)) {
            const json = fs.readFileSync(this.SAVE_FILE, 'utf8');
            const bindingsData = JSON.parse(json);
            

            const restoredBindings = {};
            for (const [key, data] of Object.entries(bindingsData)) {
                restoredBindings[key] = this._createCommandFromData(data);
            }
            
            return new KeyboardMemento(restoredBindings);
        }
        return null;
    }

    _createCommandFromData(data) {
        switch(data.type) {
            case 'PrintCharCommand':
                return new PrintCharCommand(global.keyboardInstance, data._char);
            case 'VolumeUpCommand':
                return new VolumeUpCommand();
            case 'VolumeDownCommand':
                return new VolumeDownCommand();
            case 'MediaPlayerCommand':
                return new MediaPlayerCommand();
            default:
                return null;
        }
    }
}

class VirtualKeyboard {
    constructor() {
        this._keyBindings = {};
        this._commandHistory = [];
        this._redoStack = [];
        this._output = [];
        this._stateSaver = new KeyboardStateSaver();


        global.keyboardInstance = this;

        const memento = this._stateSaver.loadState();
        if (memento) {
            this._keyBindings = memento.keyBindings;
        }
    }

    bindKey(keyCombination, command) {
        this._keyBindings[keyCombination] = command;
        this._saveState();
    }

    pressKey(keyCombination) {
        if (this._keyBindings[keyCombination]) {
            const command = this._keyBindings[keyCombination];
            command.execute();
            this._commandHistory.push(command);
            this._redoStack = [];
        }
    }

    undo() {
        if (this._commandHistory.length > 0) {
            const command = this._commandHistory.pop();
            command.undo();
            this._redoStack.push(command);
        }
    }

    redo() {
        if (this._redoStack.length > 0) {
            const command = this._redoStack.pop();
            command.execute();
            this._commandHistory.push(command);
        }
    }

    print(char) {
        this._output.push(char);
    }

    eraseLastChar() {
        if (this._output.length > 0) {
            this._output.pop();
        }
    }

    _saveState() {
        const memento = new KeyboardMemento(this._keyBindings);
        this._stateSaver.saveState(memento);
    }

    getOutput() {
        return this._output.join('');
    }
}

// Main
if (fs.existsSync("output.txt")) {
    fs.unlinkSync("output.txt");
}

const keyboard = new VirtualKeyboard();


keyboard.bindKey("a", new PrintCharCommand(keyboard, 'a'));
keyboard.bindKey("b", new PrintCharCommand(keyboard, 'b'));
keyboard.bindKey("c", new PrintCharCommand(keyboard, 'c'));
keyboard.bindKey("d", new PrintCharCommand(keyboard, 'd'));
keyboard.bindKey("ctrl++", new VolumeUpCommand());
keyboard.bindKey("ctrl+-", new VolumeDownCommand());
keyboard.bindKey("ctrl+p", new MediaPlayerCommand());


keyboard.pressKey("a");
keyboard.pressKey("b");
keyboard.pressKey("c");
keyboard.undo();
keyboard.undo();
keyboard.redo();
keyboard.pressKey("ctrl++");
keyboard.pressKey("ctrl+-");
keyboard.pressKey("ctrl+p");
keyboard.pressKey("d");
keyboard.undo();
keyboard.undo();

console.log("\nВывод результата: " + keyboard.getOutput());
