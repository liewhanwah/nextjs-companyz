import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          // access_type: "offline",
          response_type: "code",
          //scope: process.env.GOOGLE_CLIENT_SCOPE as string,
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      // if (session?.user) {
      //   session.user.name = user.id;
      // }
      return session;
    },
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }

      return token;
    },
  },
  // session: {
  //   strategy: "jwt",
  // },
});
