import { initTRPC } from "@trpc/server";
import payload from "payload";
import superjson from "superjson";

const {
  router,
  middleware,
  procedure: publicProcedure,
} = initTRPC.create({
  transformer: superjson,
});

export const appRouter = router({
  greeting: publicProcedure.query(() => {
    return "hello tRPC!";
  }),
  users: publicProcedure.query(() => {
    return payload.find({
      collection: "users",
    });
  }),
});
