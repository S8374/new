/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// src/lib/auth.ts
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import  { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {

          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          // Log the API URL being used
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

          const response = await axios.post(apiUrl, {
            email: credentials.email,
            password: credentials.password
          }, {
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json',
            }
          });


          if (response.data.success) {
            const { user, token } = response.data.data;
            
            
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken: token
            };
          } else {
            throw new Error(response.data.message || 'Authentication failed');
          }
        } catch (error: any) {
          console.error('Full auth error:', error);
          
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Backend response error:', {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers
            });
            
            if (error.response.data?.message) {
              throw new Error(error.response.data.message);
            } else if (error.response.status === 401) {
              throw new Error('Invalid email or password');
            } else if (error.response.status === 500) {
              throw new Error('Server error. Please try again later.');
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            throw new Error('Cannot connect to server. Please check if backend is running.');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request setup error:', error.message);
            throw new Error(error.message || 'Authentication failed');
          }
          
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session  } : { token: any; user: any; trigger: string; session: any }) {
      // Initial sign in
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
        token.id = user.id;
      }

      // Update token if session is updated
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token } : { session: any; token: any }) {
      session.accessToken = token.accessToken as string;
      session.user.role = token.role as string;
      session.user.id = token.id as string;
      
      return session;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};