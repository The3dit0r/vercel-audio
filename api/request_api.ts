import { VercelRequest, VercelResponse } from "@vercel/node";
import { generateErrorCode, handleCatch, joinString } from "./util";
import { fetchToken, musixApi, SpotifyApi } from "./public_api";

const version = process.env.APPLICATION_VERSION;

export async function handleAPIRequest(
  req: VercelRequest,
  res: VercelResponse
) {
  const { endpoint: rawType, q: rawQuery } = req.query;

  const type = joinString(rawType);
  const query = joinString(rawQuery);

  const { origin } = req.headers;

  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Cache-Control", "max-age=3600");

  try {
    const typeCase = {
      search: async function () {
        await fetchToken();

        // const yt = ytSearch(query);
        const sp = SpotifyApi.search(query, [
          "album",
          "playlist",
          "track",
          "artist",
        ]);

        const result = await Promise.all([, sp]);
        res.setHeader("Cache-Control", "max-age=300");

        res.json(result[1].body);
      },

      lyrics: async function () {
        const { id } = getIDFromQuery(req);

        await fetchToken();
        const { external_ids } = (await SpotifyApi.getTrack(id)).body;

        const isrc = external_ids.isrc;
        const lyrics = await musixApi.getSubtitleLyrics(isrc);

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

      albums: async function () {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const { body } = await SpotifyApi.getAlbum(id);
        res.json(body);
      },

      "albums-tracks": async function () {
        const { id, limit, offset } = getIDFromQuery(req);
        await fetchToken();

        const { body } = await SpotifyApi.getAlbumTracks(id, {
          limit,
          offset,
        } as any);

        res.json(body);
      },

      playlists: async function () {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const { body } = await SpotifyApi.getPlaylist(id);
        res.json(body);
      },

      "playlists-tracks": async function () {
        const { id, limit, offset } = getIDFromQuery(req);
        await fetchToken();

        const d = await SpotifyApi.getPlaylistTracks(id, { limit, offset });
        res.json(d.body);
      },

      artists: async function () {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const { body } = await SpotifyApi.getArtist(id);
        res.json(body);
      },

      "artists-albums": async function () {
        const { id, limit, offset } = getIDFromQuery(req);
        await fetchToken();

        const d = await SpotifyApi.getArtistAlbums(id, { limit, offset });
        res.json(d.body);
      },

      "artists-top-tracks": async function () {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const d = await SpotifyApi.getArtistTopTracks(id, "VN");
        res.json(d.body);
      },

      "artists-related-artists": async function () {
        const { id } = getIDFromQuery(req);
        await fetchToken();

        const d = await SpotifyApi.getArtistRelatedArtists(id);
        res.json(d.body);
      },

      recommendations: async function () {
        const { seed_tracks, seed_artists, limit } = parseVercelQuery(req);
        await fetchToken();

        const tracks = seed_tracks.split(",");

        const d = await SpotifyApi.getRecommendations({
          // seed_artists,
          seed_tracks: tracks.slice(0, 3),
          market: "VN",
          limit: 20,
        });
        res.json(d.body);
      },
    };

    const execFunc = typeCase[type];

    if (execFunc) {
      console.log("DATA: " + req.url || "/" + type);
      execFunc();
    } else {
      res.status(404).send({
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
