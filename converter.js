const fs = require("fs");

const SRC = "./api/public/";
const DIST = "./api/";

const public = fs.readdirSync(SRC);
const finalFile = [];
const files = {};

for (const file of public) {
  const data = fs.readFileSync(SRC + file, { encoding: "utf-8" });
  files["/" + file] = data.split("\n").join("");

  console.log("Processing", file);
}

finalFile.push("const publicFiles = " + JSON.stringify(files, null, 2) + ";");
finalFile.push("\n\nexport default publicFiles;");

fs.writeFileSync(DIST + "public.ts", finalFile.join("\n"));
console.log("Done");
