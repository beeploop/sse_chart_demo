import { createServer } from "http";
import { parse } from "url";
import { indexRoute } from "./routes/index.js";
import { eventsRoute } from "./routes/events.js";

const PORT = 3000;

const server = createServer((req, res) => {
  const url = parse(req.url).pathname;

  switch (url) {
    case "/":
      indexRoute(req, res);
      return;
    case "/events":
      eventsRoute(req, res);
      return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 not found");
});

server.listen(PORT, () => console.log(`listening in port: ${PORT}`));
