import type { VercelRequest, VercelResponse } from "@vercel/node";

import { handleCatch, joinString } from "./util";
import util from "util";

import ytdl from "ytdl-core";
import ytSearch from "yt-search";

import { getStreamID, saveStreamID } from "./storage";
import { fetchToken, getYoutubeData, SpotifyApi } from "./public_api";
import { handleGETRequest } from "./method_get";
import publicFiles from "./public";

const PROTOCOL = process.env.PROTOCOL || "http";

const buildVersion =
  process.env.APPLICATION_VERSION || new Date().toUTCString();

const fs = {
  readFileSync: (path: string) => {
    console.log("Requesting", path);

    if (!publicFiles[path])
      throw new Error(
        "Public string for " + path + " does not exist, have you rebuilt it?"
      );

    return publicFiles[path].replace(
      "{footer}",
      publicFiles["/footer.html"] || ""
    );
  },
};

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
  const file = fs.readFileSync("/_index.css");
  return `<style>${file}</style>`;
}

function getScript() {
  const file = fs.readFileSync("/_index.js");
  return `<script>${file}</script>`;
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
    data[1] = fs
      .readFileSync(path + ".html")
      .replace("{buildVersion}", buildVersion);
  } catch (err) {
    data[1] = fs
      .readFileSync("/404.html")
      .replace("{footer}", publicFiles["/footer.html"] || "")
      .replace("{errorMessage}", util.format(err))
      .replace("{date}", new Date().toLocaleString())
      .replace("{buildVersion}", buildVersion);
  }

  res.setHeader("Content-Type", "text/html");
  res.send(
    data
      .join("")
      .split("{serverOrigin}")
      .join(PROTOCOL + "://" + req.headers.host || "{serverOrigin}")
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id: rawID } = req.query;

  const sid = joinString(rawID);

  const range = req.headers.range;
  const path = req.url || "/";

  console.log(path);

  if (path.startsWith("/api")) {
    return handleGETRequest(req, res);
  }

  if (!path.startsWith("/audio")) {
    return handleHTML(req, res);
  }

  try {
    await fetchToken();
    const {
      name,
      artists,
      external_ids,
      id: trackID,
    } = (await SpotifyApi.getTrack(sid)).body;

    // #region Stream
    let id = await getStreamID(trackID);

    if (!id) {
      const query = `${name} - ${artists.map((a) => a.name).join(", ")}`;
      /* - */ console.log("Track retrieve:", query);
      const { videos = [] } = await ytSearch(query);
      id = videos[0].videoId;
      saveStreamID(trackID, id);
    }
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
          : Math.min(4 * 1e6, contentLength - start);

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
          end: Math.min(
            Number.parseInt(result.format.contentLength),
            0.3 * 1e6
          ),
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
    handleCatch(err, res, "audio");
  }
}
