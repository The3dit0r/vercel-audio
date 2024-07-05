import { VercelRequest, VercelResponse } from "@vercel/node";
import { generateErrorCode, handleCatch, joinString } from "./util";
import { fetchToken, musixApi, SpotifyApi } from "./public_api";

const version = process.env.APPLICATION_VERSION;

export async function handleGETRequest(
  req: VercelRequest,
  res: VercelResponse
) {
  const { type: rawType, query: rawQuery } = req.query;

  const type = joinString(rawType);
  const query = joinString(rawQuery);

  // console.log(type);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  try {
    const typeCase = {
      search: async () => {
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
      },

      lyrics: async () => {
        const { id } = getIDFromQuery(req);

        await fetchToken();
        const { external_ids } = (await SpotifyApi.getTrack(id)).body;

        const isrc = external_ids.isrc;
        const lyrics = await musixApi.getSubtitleLyrics(isrc);

        console.log("Fetching lyrics:", id, "-", isrc);

        const data = {
          langauge: lyrics.subtitle_language,
          lines: lyrics.subtitle_body.map((a) => {
            return {
              text: a.text,
              time: a.time.total,
            };
          }),
          id: id,
        };

        res.json(data);
      },

      album: async () => {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const { body } = await SpotifyApi.getAlbum(id);
        res.json(body);
      },

      album_tracks: async () => {
        const { id, limit, offset } = getIDFromQuery(req);
        await fetchToken();

        const { body } = await SpotifyApi.getAlbumTracks(id, {
          limit,
          offset,
        } as any);

        res.json(body);
      },

      playlist: async () => {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const { body } = await SpotifyApi.getPlaylist(id);
        res.json(body);
      },

      playlist_tracks: async () => {
        const { id, limit, offset } = getIDFromQuery(req);
        await fetchToken();

        const d = await SpotifyApi.getPlaylistTracks(id, { limit, offset });
        res.json(d.body);
      },

      artist: async () => {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const { body } = await SpotifyApi.getArtist(id);
        res.json(body);
      },

      artist_albums: async () => {
        const { id, limit, offset } = getIDFromQuery(req);
        await fetchToken();

        const d = await SpotifyApi.getArtistAlbums(id, { limit, offset });
        res.json(d.body);
      },

      artist_related: async () => {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const d = await SpotifyApi.getArtistRelatedArtists(id);
        res.json(d.body);
      },

      recommendation: async () => {
        const { seed_tracks, seed_artists, limit } = parseVercelQuery(req);
        await fetchToken();

        const d = await SpotifyApi.getRecommendations({
          seed_artists,
          seed_tracks,
          limit: parseInt(limit || "20"),
        });
        res.json(d.body);
      },
    };

    const execFunc = typeCase[type];

    if (execFunc) {
      execFunc();
    } else {
      res.send({
        available: Object.keys(typeCase),
        version,
        timestamp: new Date().toUTCString(),
      });
    }
  } catch (err) {
    handleCatch(err, res, type);
  }
}

function parseVercelQuery(req: VercelRequest) {
  const query: Record<string, string> = {};
  Object.keys(req.query).forEach((a) => {
    query[a] = joinString(req.query[a]);
  });

  return query;
}

function getIDFromQuery(req: VercelRequest) {
  const {
    id: rawID,
    limit: rawLimit = "50",
    offset: rawOffset = "0",
  } = req.query;

  const data = {
    id: joinString(rawID),
    limit: parseInt(joinString(rawLimit)) || 50,
    offset: parseInt(joinString(rawOffset)) || 0,
  };

  if (!data.id) {
    throw generateErrorCode(400, "No ID provided");
  }

  return data;
}
