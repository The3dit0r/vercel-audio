import { VercelRequest, VercelResponse } from "@vercel/node";
import { handleCatch, joinString } from "./util";
import { fetchToken, musixApi, SpotifyApi } from "./public_api";

export async function handleGETRequest(
  req: VercelRequest,
  res: VercelResponse
) {
  const { type: rawType, query: rawQuery } = req.query;

  const type = joinString(rawType);
  const query = joinString(rawQuery);

  console.log(type);

  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    switch (type) {
      case "search": {
        await fetchToken();

        // const yt = ytSearch(query);
        const sp = SpotifyApi.search(query, [
          "album",
          "playlist",
          "track",
          "artist",
        ]);

        const result = await Promise.all([, sp]);
        res.json(result[1]);

        break;
      }

      case "lyrics": {
        const { id: rawId } = req.query;
        const sid = joinString(rawId);

        await fetchToken();
        const { external_ids } = (await SpotifyApi.getTrack(sid)).body;

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

        break;
      }

      case "album": {
        await fetchToken();
        const { id: rawId } = req.query;
        const sid = joinString(rawId);

        const data = await SpotifyApi.getAlbum(sid);
        res.json(data.body);

        break;
      }

      case "album_tracks": {
        const { id: rawId, limit, offset } = req.query;
        const sid = joinString(rawId);
        await fetchToken();

        const data = await SpotifyApi.getAlbumTracks(sid, {
          limit,
          offset,
        } as any);
        res.json(data.body);

        break;
      }

      case "playlist": {
        const { id: rawID } = req.query;
        const sid = joinString(rawID);
        await fetchToken();

        4;

        break;
      }

      default: {
        res.status(400).send({ failed: true, message: "Method not found" });
      }
    }
  } catch (err) {
    handleCatch(err, res, type);
  }
}
