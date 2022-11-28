// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    return res.setHeader("Allow", "POST").status(405).json({});
  }

  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    return res
      .status(500)
      .json({ error: `Nie podano zmiennych środowiskowych` });
  }
  const email = req.body.email;

  if (typeof email !== "string") {
    return res.status(400).json({});
  }

  const mailerLiteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );

  if (!mailerLiteResponse.ok) {
    return res.status(500).json({
      error: `Pojawił się problem podczas zapisu do Newslettera`,
    });
  }

  //const json = await mailerLiteResponse.json();

  return res.status(201).json({});
};
export default handler;
