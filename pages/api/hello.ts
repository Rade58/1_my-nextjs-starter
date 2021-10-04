// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  session?.expires;
  session?.profile;
  session?.user;
  session?.userId;

  res.status(200).json({ name: "John Doe" });
}
