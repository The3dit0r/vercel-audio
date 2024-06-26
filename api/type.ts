import ytdl from "ytdl-core";

interface StreamType {
  type: "ytid" | "spid";

  name: string;
  id: string;
  duration: number;

  artists: {
    id: string;
    name: string;
  }[];
}

interface YoutubeStream extends StreamType {
  type: "ytid";

  format: ytdl.videoFormat;
}

interface SpotifyStream extends StreamType {
  type: "spid";
  ytid: string;
}

interface StreamManagerData {
  data: {
    ytids: { [n: string]: YoutubeStream };
    spids: { [n: string]: SpotifyStream };
  };

  setYTID(data: YoutubeStream): YoutubeStream;
  getYTID(id: string): YoutubeStream | null;

  setSPID(data: SpotifyStream): SpotifyStream;
  getSPID(id: string): SpotifyStream | null;
}

export { StreamType, YoutubeStream, SpotifyStream, StreamManagerData };
