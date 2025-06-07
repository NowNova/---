import { IAuthService } from './IAuthService.js';
import fs from 'fs';

export class AuthService extends IAuthService {
    static SESSION_FILE = 'session.json';

    constructor(userRepository) {
        super();
        this.userRepository = userRepository;
        this._currentUser = this._loadSession();
    }

    _loadSession() {
        try {
            const sessionData = fs.readFileSync(AuthService.SESSION_FILE, 'utf8');
            const session = JSON.parse(sessionData);
            return this.userRepository.get_by_id(session.userId);
        } catch (e) {
            return null;
        }
    }

    _saveSession() {
        const session = {
            userId: this._currentUser?.id || null
        };
        fs.writeFileSync(AuthService.SESSION_FILE, JSON.stringify(session));
    }

    sign_in(user) {
        this._currentUser = user;
        this._saveSession();
    }

    sign_out() {
        this._currentUser = null;
        this._saveSession();
    }

    get is_authorized() {
        return this._currentUser !== null;
    }

    get current_user() {
        return this._currentUser;
    }
}