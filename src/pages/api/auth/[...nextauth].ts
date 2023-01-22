import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
  secret: "ABC",
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ user, token }) {
      if(user?.id) {
        token.uid = user.id
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.uid;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials?.email)

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        }).catch(err => {
          console.log(err)
        });

        console.log(JSON.stringify(user))
        if (user && user.password === credentials?.password) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          if (!user && credentials) {
            return await prisma.user.create({
              data: {
                email: credentials.email,
                password: credentials.password,
              },
            });
          }
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
  },
});
