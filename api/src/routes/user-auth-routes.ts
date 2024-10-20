import { Router } from 'express';
import { UserAuthController } from '../controllers/user-auth-controller';
import passport from '../config/passport-setup';

const userAuthController = new UserAuthController();
const router = Router();

router.post('/login', userAuthController.login.bind(userAuthController));
router.post('/register', userAuthController.register.bind(userAuthController));
router.post('/verify-otp', userAuthController.verifyOtp.bind(userAuthController));
router.post('/create-password', userAuthController.updatePassword.bind(userAuthController));
router.post('/verify-user-exists', userAuthController.verifyUserExists.bind(userAuthController));

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent'
}));
router.get('/google/callback', passport.authenticate('google', { session: false }), userAuthController.googleCallback.bind(userAuthController));

export default router;