import { Person } from './person.js';
import { ConsoleChangeLogger } from './listeners.js';
import { AgeValidator, NameValidator } from './listeners.js';

const person = new Person('Иван', 30);

const logger = new ConsoleChangeLogger();
person.addPropertyChangedListener(logger);

const ageValidator = new AgeValidator();
const nameValidator = new NameValidator();
person.addPropertyChangingListener(ageValidator);
person.addPropertyChangingListener(nameValidator);

console.log('--- Корректные изменения ---');
person.name = 'Петр';
person.age = 35;

console.log('\n--- Некорректные изменения ---');
person.name = 'A';
person.name = 'Иван123';
person.age = -5;
person.age = 150;
person.age = 25;

console.log('\n--- Итоговые значения ---');
console.log(`Имя: ${person.name}, Возраст: ${person.age}`);