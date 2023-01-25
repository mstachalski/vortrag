import { procedure, router } from "../trpc";
import { Topics, topicSchema } from "@/schemas/topicSchema";
import { prisma } from "../../../lib/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
  getTopics: procedure.query(async () => {
    return await prisma.topic.findMany({
      select: { type: true, title: true, description: true },
    });
  }),
  createTopic: procedure.input(topicSchema).mutation(async (req) => {
    const user = await prisma.user
      .findUnique({
        where: { id: req.input.author.id },
      })
      .catch(() =>
        console.log("User with id " + req.input.author.id + " not found")
      );

    if (user) {
      await prisma.topic.create({
        data: {
          author: { connect: { id: user.id } },
          description: req.input.topic.description,
          type: req.input.topic.type,
          Votes: 0,
          title: "Hello",
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Hand in not successful",
        cause: "User not found",
      });
    }
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
