import { User } from './User.js';
import { UserRepository } from './UserRepository.js';
import { AuthService } from './AuthService.js';

const userRepo = new UserRepository('users.json');
const authService = new AuthService(userRepo);


const user1 = new User(1, 'Sasha', '9018', 'pass123', 'sasha@example.com');
const user2 = new User(2, 'Poel', '777', 'pass456', 'mocrica@example.com', '123 Main St');

userRepo.add(user1);
userRepo.add(user2);


console.log('All users:', userRepo.get_all().sort(User.compare));


authService.sign_in(user1);
console.log('Current user:', authService.current_user);
console.log('Is authorized:', authService.is_authorized);


authService.sign_in(user2);
console.log('New current user:', authService.current_user);



console.log('After sign out:', authService.current_user);


console.log('\nRestarting application...');
const newAuthService = new AuthService(userRepo);
console.log('Auto-login user:', newAuthService.current_user);