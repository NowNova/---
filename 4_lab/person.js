import { ObservableObject, ValidatableObject } from './observableObject.js';

export class Person extends ValidatableObject {
    constructor(name, age) {
        super();
        this._name = name;
        this._age = age;
        this._listeners = new Set();
    }

    addPropertyChangedListener(listener) {
        this._listeners.add(listener);
    }

    removePropertyChangedListener(listener) {
        this._listeners.delete(listener);
    }

    _notifyPropertyChanged(propertyName) {
        for (const listener of this._listeners) {
            listener.onPropertyChanged(this, propertyName);
        }
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (this._validatePropertyChange('name', this._name, value)) {
            this._name = value;
            this._notifyPropertyChanged('name');
        }
    }

    get age() {
        return this._age;
    }

    set age(value) {
        const newAge = Number(value);
        if (this._validatePropertyChange('age', this._age, newAge)) {
            this._age = newAge;
            this._notifyPropertyChanged('age');
        }
    }
}