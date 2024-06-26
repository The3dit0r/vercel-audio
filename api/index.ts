import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { YoutubeStream } from "./type";

import ytdl from "ytdl-core";
import { convertType, joinString } from "./util";

import SpotifyWebApi from "spotify-web-api-node";
import ytSearch from "yt-search";

import MusixMatch from "./lyric_module";
import util from "util";
import fs from "fs";

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT,
  clientSecret: process.env.SECRET,
  redirectUri: "http://localhost:3000",
});

const musixApi = new MusixMatch(process.env.MMTOKEN?.split(","));

// const StreamManager: StreamManagerData = {
//   data: {
//     ytids: {},
//     spids: {},
//   },

//   setYTID(data) {
//     const { id } = data;
//     this.data.ytids[id] = Object.assign({}, data);
//     return data;
//   },

//   getYTID(id) {
//     const data = this.data.ytids[id];
//     return data || null;
//   },

//   setSPID(data) {
//     const { id } = data;
//     this.data.spids[id] = data;
//     return data;
//   },

//   getSPID(id) {
//     const data = this.data.spids[id];
//     return data || null;
//   },
// };

function getStyle() {
  const file = fs.readFileSync(__dirname + "/public/_index.css", {
    encoding: "utf-8",
  });
  return `<style>${file}</style>`;
}

function getScript() {
  const file = fs.readFileSync(__dirname + "/public/_index.js", {
    encoding: "utf-8",
  });
  return `<script>${file}</script>`;
}

async function fetchToken() {
  const newTOKEN = await SpotifyApi.clientCredentialsGrant();
  const token = newTOKEN.body.access_token;

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

async function handleHTML(req: VercelRequest, res: VercelResponse) {
  console.log("Documentation requested");

  const data = [
    '<!DOCTYPE html><html lang="en"><html>',
    "",
    getStyle(),
    getScript(),
    "</html>",
  ];
  const path = req.url === "/" ? "/index" : req.url;

  try {
    data[1] = fs.readFileSync(__dirname + "/public" + path + ".html", {
      encoding: "utf-8",
    });
  } catch (err) {
    data[1] = fs
      .readFileSync(__dirname + "/public/404.html", {
        encoding: "utf-8",
      })
      .replace("{errorMessage}", util.format(err))
      .replace("{date}", new Date().toLocaleString());
  }

  res.setHeader("Content-Type", "text/html");
  res.send(
    data
      .join("")
      .split("{serverOrigin}")
      .join(req.headers.host || "{serverOrigin}")
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id: rawID, type: rawType } = req.query;

  const sid = joinString(rawID);

  const type = convertType(rawType);
  const range = req.headers.range;
  const path = req.url || "/";

  console.log(path);

  if (!path.startsWith("/api")) {
    return handleHTML(req, res);
  }

  try {
    await fetchToken();
    const { name, artists, external_ids } = (await SpotifyApi.getTrack(sid))
      .body;

    if (type === "lyrics") {
      // #region Lyrics

      const isrc = external_ids.isrc;
      const lyrics = await musixApi.getSubtitleLyrics(isrc);

      console.log("Fetching lyrics:", sid, "-", isrc);

      const data = {
        langauge: lyrics.subtitle_language,
        lines: lyrics.subtitle_body.map((a) => {
          return {
            text: a.text,
            time: a.time.total,
          };
        }),
        id: sid,
      };

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST");

      res.json(data);

      //#endregion
      return;
    }

    // #region Stream
    const query = `${name} - ${artists.map((a) => a.name).join(", ")}`;
    /* - */ console.log("Track retrieve:", query);

    const { videos = [] } = await ytSearch(query);

    const id = videos[0].videoId;
    /* - */ console.log("Stream ID:", id);

    const result = await getYoutubeData(id);

    if (range) {
      const positions = range.replace(/bytes=/, "").split("-");
      const start = parseInt(positions[0], 10);
      const end = positions[1] ? parseInt(positions[1], 10) : NaN;

      const contentLength = parseInt(result.format.contentLength);
      const chunkSize =
        !isNaN(end) && end < contentLength
          ? end - start + 1
          : contentLength - start;

      const header = {
        "Content-Range": `bytes ${start}-${
          start + chunkSize - 1
        }/${contentLength}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": 'audio/webm; codecs="opus"',
      };

      res.writeHead(206, header);

      ytdl(result.id, {
        format: result.format,
        range: { start, end },
      }).pipe(res);

      console.log(header, result.format.mimeType);
    } else {
      ytdl(result.id, {
        format: result.format,
        range: {
          start: 0,
          end: Math.min(Number.parseInt(result.format.contentLength), 2000),
        },
      }).pipe(res);
    }
    // } else {
    //   const newRes = { ...result };
    // delete newRes.stream;
    //   res.json(newRes);
    // }
    // #endregion
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", failed: true, err });
  }
}
