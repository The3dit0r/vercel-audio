import publicFiles from "./public";
import APP_INFO from "./.branch_dependant.info";

import util from "util";
import { VercelRequest, VercelResponse } from "@vercel/node";

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

function getStyle() {
  const file = fs.readFileSync("/_index.css");
  return `<style>${file}</style>`;
}

function getScript() {
  const file = fs.readFileSync("/_index.js");
  return `<script>${file}</script>`;
}

export async function handleHTMLRequest(
  req: VercelRequest,
  res: VercelResponse
) {
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
      .replace(
        "{buildVersion}",
        `${APP_INFO.VERSION} - Branch: ${APP_INFO.BRANCH}`
      );
  } catch (err) {
    data[1] = fs
      .readFileSync("/404.html")
      .replace("{footer}", publicFiles["/footer.html"] || "")
      .replace("{errorMessage}", util.format(err))
      .replace("{date}", new Date().toLocaleString())
      .replace(
        "{buildVersion}",
        `${APP_INFO.VERSION} - Branch: ${APP_INFO.BRANCH}`
      );
  }

  res.setHeader("Content-Type", "text/html");
  res.send(
    data
      .join("")
      .split("{serverOrigin}")
      .join(APP_INFO.PROTOCOL + "://" + req.headers.host || "{serverOrigin}")
  );
}
