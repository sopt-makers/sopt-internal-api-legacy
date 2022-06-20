import dotenv from "dotenv-safe";
dotenv.config();
import { PORT } from "@/infrastructure/config/const";
import { createServer } from "@/infrastructure/webserver/server";

async function start() {
  const app = await createServer();
  app.listen(PORT, () => {
    console.log(`Server Started: (http://localhost:${PORT})`);
  });
}

start();
