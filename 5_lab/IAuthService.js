import { User } from './User.js';

export class IAuthService {
    sign_in(user) { throw new Error("Not implemented"); }
    sign_out() { throw new Error("Not implemented"); }
    get is_authorized() { throw new Error("Not implemented"); }
    get current_user() { throw new Error("Not implemented"); }
}