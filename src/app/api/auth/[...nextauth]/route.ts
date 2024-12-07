import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const OPTIONS: NextAuthOptions = {
  providers: [
    
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt callback user data", user);
      console.log("jwt callback token", token);
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
