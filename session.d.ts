// I CREATED THIS DECLARATION BECAUSE
// BY USING CALLBACKS AND EVENTS IN HERE: pages/api/auth/[...nextauth].ts
// I MENAGED TO DEFINE EXTENDING OF session OBJECT
import type { Session as Ses } from "next-auth";
import type { Profile } from "@prisma/client";

interface Session {
  expires?: Ses["expires"];
  user?: Ses["user"];
  profile?: Profile;
  userId?: string;
}

declare module "next-auth/client" {
  function useSession(): [Session | null, boolean];
  function getSession(
    options?: GetSessionOptions | undefined
  ): Promise<Session | null>;
}
