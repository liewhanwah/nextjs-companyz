import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;

const getYTData = async (pageToken = "") => {
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/subscriptions?mine=true&pageToken=${pageToken}&maxResults=50&part=snippet`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = await data.json();
  return result;
  //   if (data?.nextPageToken) {
  //     return data.items.concat(await getYTData(data.nextPageToken));
  //   }

  //   return data.items;
};

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req });
  accessToken = token.access_token;
  const data = await getYTData();

  res.status(200).json(data);
};
