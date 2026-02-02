import nextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import 'dotenv';

export const { handlers, signIn, signOut, auth } = nextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        if (credentials.username === process.env.ADMIN_USERNAME) {
          if (credentials.password === process.env.ADMIN_PASSWORD) {
            user = {
              name: 'Saman',
            };
          } else {
            throw new Error('Invalid Password!');
          }
        } else {
          throw new Error('Invalid Username!');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
