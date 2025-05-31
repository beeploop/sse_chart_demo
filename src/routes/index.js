import { readFile } from "fs";

export function indexRoute(_req, res) {
  readFile("./views/index.html", (err, data) => {
    if (err) {
      res.write(`error encounteredd: ${err}`);
      res.end();
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
}
