import type { VercelRequest, VercelResponse } from "@vercel/node";

import ytdl from "ytdl-core";
import ytSearch from "yt-search";

import { handleAPIRequest } from "./request_api";
import { handleHTMLRequest } from "./request_doc";

import { getStreamID, saveStreamID } from "./storage";
import { fetchToken, getYoutubeData, SpotifyApi } from "./public_api";
import { handleCatch, joinString } from "./util";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id: rawID } = req.query;

  const sid = joinString(rawID);

  const range = req.headers.range;
  const path = req.url || "/";

  console.log(path);

  if (path.startsWith("/api")) {
    return handleAPIRequest(req, res);
  }

  if (!path.startsWith("/audio")) {
    return handleHTMLRequest(req, res);
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
