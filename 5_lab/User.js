export class User {
    constructor(id, name, login, password, email = null, address = null) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.email = email;
        this.address = address;
    }

    toString() {
        return `User(id=${this.id}, name=${this.name}, login=${this.login}, email=${this.email}, address=${this.address})`;
    }

    static compare(a, b) {
        return a.name.localeCompare(b.name);
    }
}