import { DataRepository } from './DataRepository.js';
import { IUserRepository } from './IUserRepository.js';
import { User } from './User.js';

export class UserRepository extends DataRepository {
    constructor(filename) {
        super(filename);
    }

    get_by_login(login) {
        return this.data.find(user => user.login === login) || null;
    }
}