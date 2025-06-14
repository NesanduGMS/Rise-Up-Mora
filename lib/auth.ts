import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";
import { compare } from "bcrypt";

export async function comparePassword(password: string, hashPassword: string) {
  const isValid = await compare(password, hashPassword);

  return isValid;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials: any) => {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // async signIn({
    //   user,
    //   account,
    // }: {
    //   user: any;
    //   account: any;
    // }): Promise<boolean> {
    //   // if (user) {
    //   //   return true;
    //   // }

    //   return true;
    // },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.id = token.id;
      session.user.token = token;
      session.user.picture = token.image;
      return session;
    },

    async jwt(params: {
      token: any;
      user: any;
      session?: any;
      // account?: any | null | undefined;
      // profile?: any | undefined;
      // isNewUser?: boolean | undefined;
    }) {
      if (params.user) {
        params.token.id = params.user._id;
        params.token.name = params.user.name;
        params.token.image = params.user.image;

        // params.token.id = params.user.id;
        // Handle user-related logic here
      } else {
        // Handle the case when the user is undefined
      }
      return params.token;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
};
