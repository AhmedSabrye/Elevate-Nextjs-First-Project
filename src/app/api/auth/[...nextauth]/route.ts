import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const body = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const fetchedData = await fetch(
          "https://exam.elevateegy.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          }
        );
        const finalFitchedData = await fetchedData.json();
        console.log("credentials", credentials);
        console.log();
        if (finalFitchedData.user != undefined) return finalFitchedData.user;

        return null;
      },
    }),
  ],
  pages:{
    signIn: '/signin',
  }
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
