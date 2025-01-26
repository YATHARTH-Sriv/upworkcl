import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` property here
      name: string;
      email: string;
      image: string;
    };
  }

  interface User {
    id: string; // Add `id` to the User object if needed elsewhere
    name: string;
    email: string;
    image: string;
  }
}
