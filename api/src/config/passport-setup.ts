import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request } from 'express';
import { AuthUserResponse } from '../dtos/users/auth/auth-user-response-dto';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    passReqToCallback: true,
    scope: ['profile', 'email'],
}, async (req: Request, accessToken: string, refreshToken: string, params: any, profile: Profile, done: VerifyCallback) => {
    try {
        const email = profile.emails![0].value;
        const name = profile.displayName;
        const image = profile.photos ? profile.photos[0].value : null;

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('defaultPassword123', salt);

            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    image,
                    email_verified_at: new Date(Date.now()),
                    password: hashedPassword,
                },
            });
        }
        
        if(user){
            await prisma.socialAccount.upsert({
                where: { provider_user_id: profile.id },
                update: {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    updated_at: new Date(),
                },
                create: {
                    user_id: user.id,
                    provider: profile.provider,
                    provider_user_id: profile.id,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    expires_at: new Date(Date.now() + 3600 * 1000),
                },
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        const authUserResponse: AuthUserResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            token
          };
          
        done(null, { authUserResponse, token });
    } catch (error) {
        console.error('Error during Google authentication:', error);
        done(error);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user ?? undefined);
});

export default passport;
