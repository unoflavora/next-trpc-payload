import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpc from "@trpc/server";
import { appRouter } from "./server";
import payload from "payload";

require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors({ origin: ["http://localhost:3000"] }));
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

const start = async () => {
  await payload.init({
    secret: "SECRET",
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.use(payload.authenticate);

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
};

start();

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
export type AppRouter = typeof appRouter;
