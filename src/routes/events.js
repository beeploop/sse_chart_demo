export function eventsRoute(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const interval = setInterval(() => {
    sentEvent(res);
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
}

function sentEvent(res) {
  const data = {
    class1: Math.random() * 100,
    class2: Math.random() * 100,
    class3: Math.random() * 100,
  };

  res.write(`data: ${JSON.stringify(data)}\n\n`);
}
