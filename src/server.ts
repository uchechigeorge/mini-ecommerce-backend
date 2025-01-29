import "module-alias/register";

import app from "./app";
import { initializeDb } from "@db/data-source";

const start = (port?: number) => {
  const PORT = port || process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);

    initializeDb();
  });
};

start();
