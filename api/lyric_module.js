"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
});
module.exports = __toCommonJS(src_exports);
var import_undici = require("undici");
var MusixMatch = class {
  constructor(tokens = []) {
    this.LYRIC_TYPES = {
      LYRICS: "track.lyrics.get",
      SUBTITLES: "track.subtitles.get",
      RICHSYNC: "track.richsync.get",
    };
    this.tokens = [];
    this.tokens = tokens;
  }
  get api_base() {
    return "https://curators.musixmatch.com/ws/1.1/";
  }
  get token() {
    return this.tokens[Math.floor(Math.random() * this.tokens.length)];
  }
  addToken(token) {
    this.tokens.push(token);
  }
  getLyrics(isrc) {
    return new Promise(async (res, rej) => {
      this.requestLyrics(isrc, this.LYRIC_TYPES.LYRICS)
        .then((req) => {
          const lyric = req.message.body.lyrics;
          lyric.lyrics_body = this.processLyrics(lyric.lyrics_body.toString());
          res(lyric);
        })
        .catch((e) => {
          rej(e);
        });
    });
  }
  async getSubtitleLyrics(isrc) {
    return new Promise((res, rej) => {
      this.requestLyrics(isrc, this.LYRIC_TYPES.SUBTITLES)
        .then((req) => {
          const lyric = req.message.body.subtitle_list[0].subtitle;
          lyric.subtitle_body = this.processSubtitles(
            lyric.subtitle_body.toString()
          );
          res(lyric);
        })
        .catch((e) => {
          rej(e);
        });
    });
  }
  async getRichsyncLyrics(isrc) {
    return new Promise((res, rej) => {
      this.requestLyrics(isrc, this.LYRIC_TYPES.RICHSYNC)
        .then((req) => {
          const lyric = req.message.body.richsync;
          lyric.richsync_body = this.processRichsync(
            lyric.richsync_body.toString()
          );
          res(lyric);
        })
        .catch((e) => {
          rej(e);
        });
    });
  }
  buildSearchParams(isrc) {
    const params = {
      format: "json",
      track_isrc: isrc,
      tags: "nowplaying",
      user_language: "en",
      subtitle_format: "mxm",
      app_id: "web-desktop-app-v1.0",
      usertoken: this.token,
    };
    return new URLSearchParams(params);
  }
  async requestLyrics(isrc, type) {
    return new Promise((res, rej) => {
      const URL = `${this.api_base}/${type}?${this.buildSearchParams(
        isrc
      ).toString()}`;
      (0, import_undici.request)(URL, {
        headers: {
          Cookie: "x-mxm-user-id=",
        },
      })
        .then(async ({ statusCode, body }) => {
          if (statusCode !== 200) {
            rej(new Error(statusCode.toString()));
          }
          const data = await body.json();
          if (data.message.header.status_code !== 200) {
            rej(new Error(data.message.header.status_code.toString()));
          }
          res(data);
        })
        .catch((e) => {
          rej(e);
        });
    });
  }
  processLyrics(lyrics_body) {
    const body = lyrics_body.split("\n");
    return body.map((item) => ({
      text: item,
    }));
  }
  processSubtitles(subtitle_body) {
    return JSON.parse(subtitle_body);
  }
  processRichsync(richsync_body) {
    const body = JSON.parse(richsync_body);
    return body.map((item) => ({
      start: item.ts * 1000, //ms
      end: item.te * 1000, //ms
      body: item.l.map((item2) => ({
        text: item2.c,
        offset: item2.o,
      })),
      text: item.x,
    }));
  }
};
var src_default = MusixMatch;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
