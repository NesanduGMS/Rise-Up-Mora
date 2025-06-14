// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// import CredentialsProvider from 'next-auth/providers/credentials';
// // import { verifyPassword } from '../../../lib/auth'; 

// const prisma = new PrismaClient();

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'text',
//           placeholder: 'your@email.com',
//         },
//         password: {
//           label: 'Password',
//           type: 'password',
//         },
//       },
//       authorize: async (credentials) => {
//         console.log(credentials)
//         console.log("ashan")
//         if (!credentials) {
//           return null;
//         }
//         console.log(credentials)

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });


//         if (!user) {
//           return null;
//         }

//         // const isValid = await verifyPassword(credentials.password, user.password);
//         // const isValid = credentials.password === user.password;
//         // if (!isValid) {
//         //   return null;
//         // }

//         return { id: user.id, email: user.email };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           id: token.id,
//           email: token.email,
//         };
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//     signOut: "/auth/signout",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.SECRET,
// });

// // Extend the NextAuth types
// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//     };
//   }

//   interface User {
//     id: string;
//     email: string;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string;
//     email: string;
//   }
// }



import NextAuth from "next-auth";



import { authOptions } from "../../../../lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };