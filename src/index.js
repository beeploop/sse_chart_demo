const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const reqURL = url.parse(req.url).pathname;

  if (reqURL === "/events") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const interval = setInterval(() => {
      const d = new Date();
      res.write(
        `data: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}\n\n`,
      );
    }, 1000);

    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  }

  if (reqURL === "/") {
    // Default return
    fs.readFile("./views/index.html", (err, data) => {
      if (err) {
        res.write(`error encounteredd: ${err}`);
        res.end();
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
});

server.listen(PORT, () => console.log(`listening in port: ${PORT}`));
