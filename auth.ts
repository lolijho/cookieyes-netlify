import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { User } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await db.execute({
            sql: 'SELECT * FROM users WHERE email = ?',
            args: [credentials.email]
          });

          const user = result.rows[0] as any;

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
};

// Utility functions
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function createUser(email: string, password: string): Promise<User | null> {
  try {
    const hashedPassword = await hashPassword(password);
    const userId = crypto.randomUUID();

    await db.execute({
      sql: 'INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)',
      args: [userId, email, hashedPassword]
    });

    return {
      id: userId,
      email,
      password_hash: hashedPassword,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    const user = result.rows[0] as any;
    return user || null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

