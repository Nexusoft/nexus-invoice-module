import fs from 'fs';

export function readJson(path) {
  try {
    // const json = fs.readFileSync(path);
    return JSON.parse(json);
  } catch (err) {
    console.error(err);
    return {};
  }
}

export function writeJson(path, json) {
  return null; //fs.writeFileSync(path, JSON.stringify(json, null, 2));
}
