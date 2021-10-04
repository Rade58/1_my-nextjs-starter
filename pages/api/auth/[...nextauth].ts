import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
// import type { JWT } from "next-auth/jwt";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismaClient from "../../../lib/prisma";

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      Providers.Email({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.FROM_EMAIL,
        // LIKE THIS WE CAN CUSTOMIZE EMAIL WE ARE SENDING
        // BUT WE WOULD NEED DIFFERENT CONFIGURATION ABOVE US (for server)
        /* sendVerificationRequest({
          // SEE HERE HOW TO DO IT
          //    https://next-auth.js.org/providers/email#customizing-emails
        }) */
      }),
    ],

    database: process.env.DATABASE_URL,
    secret: process.env.SECRET,
    adapter: PrismaAdapter(prismaClient),

    // I NEED TO LOOK INTO THIS
    // I DON'T WANT TO CUSTOMIZE TOKEN STUFF FOR NOW
    /* session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
      secret: "VD01eYRMrJ5EG3EOJ8HjO9lgqmp4U8n7ro8pGq3838s",
      encryption: true,
    },
    debug: true, */

    pages: {
      signIn: "/signin",
      verifyRequest: "/verify-email-info",
    },

    // WHEN User RECORD IS CREATED BY NEXT-AUTH
    // WE ALSO WANT TO CREATE A Profile RECORD TOO
    events: {
      createUser: async (user) => {
        if (!user.email) return;

        const obtainedUser = await prismaClient.user.findUnique({
          where: {
            email: user.email,
          },
          select: {
            id: true,
          },
        });

        if (!obtainedUser) return;

        await prismaClient.profile.create({
          data: {
            user: {
              connect: {
                id: obtainedUser.id,
              },
            },
          },
        });
      },
    },

    // WE WANT TO INSERT PROFILE ON session OBJECT
    callbacks: {
      session: async (session, user) => {
        if (session.userId && session.profile) {
          return session;
        }

        const userId = user.id as string;

        if (userId) {
          session.userId = userId;
        }

        const profile = await prismaClient.profile.findFirst({
          where: {
            user: {
              id: {
                equals: userId,
              },
            },
          },
        });

        if (profile) {
          session.profile = profile;
        }

        return session;
      },
    },
  });

export default handler;
