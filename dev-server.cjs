// Starts Next's dev server in the current process. `next dev` normally forks a
// worker over a named pipe, which the sandboxed shell cannot open.
process.env.__NEXT_DEV_SERVER = "1";
const { startServer } = require("next/dist/server/lib/start-server");

startServer({
  dir: process.cwd(),
  port: 3000,
  hostname: "127.0.0.1",
  allowRetry: true,
  isDev: true,
  serverFastRefresh: true,
})
  .then((r) => console.log("[preview] Next dev server ready:", r))
  .catch((e) => {
    console.error("[preview] failed to start:", e);
    process.exit(1);
  });
