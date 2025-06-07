import { IDataRepository } from './IDataRepository.js';
import { User } from './User.js';

export class IUserRepository extends IDataRepository {
    get_by_login(login) { throw new Error("Not implemented"); }
}