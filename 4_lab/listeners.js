export class ConsoleChangeLogger {
    onPropertyChanged(obj, propertyName) {
        console.log(`[Изменение] Свойство ${propertyName} изменено. Новое значение: ${obj[propertyName]}`);
    }
}

export class AgeValidator {
    onPropertyChanging(obj, propertyName, oldValue, newValue) {
        if (propertyName === 'age') {
            if (newValue < 0 || newValue > 120) {
                console.log(`[Валидация] Недопустимый возраст: ${newValue}`);
                return false;
            }
            if (newValue < oldValue) {
                console.log(`[Валидация] Возраст не может уменьшаться!`);
                return false;
            }
        }
        return true;
    }
}

export class NameValidator {
    onPropertyChanging(obj, propertyName, oldValue, newValue) {
        if (propertyName === 'name') {
            if (newValue.length < 2 || newValue.length > 30) {
                console.log(`[Валидация] Имя должно быть от 2 до 30 символов`);
                return false;
            }
            if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(newValue)) {
                console.log(`[Валидация] Имя содержит недопустимые символы`);
                return false;
            }
        }
        return true;
    }
}