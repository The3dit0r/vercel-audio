import { kv } from "@vercel/kv";
import { exceptions } from "./exception";

async function saveStreamID(track: string, stream: string) {
  if (Object.keys(exceptions).includes(track)) return exceptions[track];

  try {
    const results = await kv.set(track, stream);
    return results;
  } catch (err: any) {}
}

async function getStreamID(track: string) {
  if (exceptions[track]) {
    return exceptions[track];
  }

  try {
    const stream = await kv.get(track);
    return stream;
  } catch (err) {
    return null;
  }
}

export { saveStreamID, getStreamID };
