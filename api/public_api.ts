import SpotifyWebApi from "spotify-web-api-node";
import ytdl from "ytdl-core";
import { kv } from "@vercel/kv";

import MusixMatch from "./lyric_module";

import { YoutubeStream } from "./type";

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT,
  clientSecret: process.env.SECRET,
  redirectUri: "http://localhost:4040",
});

const musixApi = new MusixMatch(process.env.MMTOKEN?.split(","));

async function fetchToken() {
  const oldTokenRaw = String(await kv.get("SP_ACCESS_TOKEN")) || "";
  const oldToken = oldTokenRaw.split(":");

  if (oldToken[0]) {
    if (parseInt(oldToken[1]) > new Date().getTime()) {
      SpotifyApi.setAccessToken(oldToken[0]);
      return oldToken[0];
    }
  }

  const newTOKEN = await SpotifyApi.clientCredentialsGrant();
  const token = newTOKEN.body.access_token;

  const expires_at = new Date().getTime() + newTOKEN.body.expires_in * 1000;
  const saveString = `${token}:${expires_at}`;

  SpotifyApi.setAccessToken(token);
  kv.set("SP_ACCESS_TOKEN", saveString);

  return token;
}

async function getYoutubeData(id: string): Promise<YoutubeStream> {
  const data = await ytdl.getInfo(id);
  const { title, videoId, lengthSeconds, author } = data.videoDetails;

  const audios = ytdl
    .filterFormats(data.formats, "audioonly")
    .filter((a) => a.mimeType?.includes("opus"));
  audios.sort(
    (a, b) =>
      Number.parseInt(b.contentLength) - Number.parseInt(a.contentLength)
  );

  return /*StreamManager.setYTID*/ {
    type: "ytid",
    name: title,
    id: videoId,
    duration: Number.parseInt(
      audios[0].approxDurationMs || lengthSeconds + "000"
    ),
    artists: [
      {
        id: author.id,
        name: author.name,
      },
    ],

    format: audios[0],
  };
}

export { musixApi, SpotifyApi, fetchToken, getYoutubeData };
