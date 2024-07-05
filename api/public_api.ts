import SpotifyWebApi from "spotify-web-api-node";
import MusixMatch from "./lyric_module";
import ytdl from "ytdl-core";

import { YoutubeStream } from "./type";

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT,
  clientSecret: process.env.SECRET,
  redirectUri: "http://localhost:4040",
});

const musixApi = new MusixMatch(process.env.MMTOKEN?.split(","));

async function fetchToken() {
  const newTOKEN = await SpotifyApi.clientCredentialsGrant();
  const token = newTOKEN.body.access_token;
  // console.log(newTOKEN);

  SpotifyApi.setAccessToken(token);
  return newTOKEN;
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

  // console.log(audios.map((a) => a.contentLength));

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
