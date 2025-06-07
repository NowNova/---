import { NotifyDataChanged, NotifyDataChanging } from './interfaces.js';

export class ObservableObject extends NotifyDataChanged {
    constructor() {
        super();
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
}

export class ValidatableObject extends NotifyDataChanging {
    constructor() {
        super();
        this._validators = new Set();
    }

    addPropertyChangingListener(listener) {
        this._validators.add(listener);
    }

    removePropertyChangingListener(listener) {
        this._validators.delete(listener);
    }

    _validatePropertyChange(propertyName, oldValue, newValue) {
        for (const validator of this._validators) {
            if (!validator.onPropertyChanging(this, propertyName, oldValue, newValue)) {
                return false;
            }
        }
        return true;
    }
}