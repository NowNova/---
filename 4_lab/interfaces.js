export class PropertyChangedListener {
    onPropertyChanged(obj, propertyName) {}
}

export class NotifyDataChanged {
    addPropertyChangedListener(listener) {}
    removePropertyChangedListener(listener) {}
}

export class PropertyChangingListener {
    onPropertyChanging(obj, propertyName, oldValue, newValue) {
        return true;
    }
}

export class NotifyDataChanging {
    addPropertyChangingListener(listener) {}
    removePropertyChangingListener(listener) {}
}