class Logger {
    constructor(filters = [], handlers = []) {
        this.filters = filters;
        this.handlers = handlers;
    }

    log(text) {
  console.log("Получено сообщение:", text); // Отладочный вывод
  const shouldLog = this.filters.every(filter => filter.match(text));
  if (shouldLog) {
    console.log("Сообщение прошло фильтры!"); // Отладочный вывод
    this.handlers.forEach(handler => handler.handle(text));
  }
}
}

module.exports = Logger;