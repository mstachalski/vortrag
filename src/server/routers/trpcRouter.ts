import { procedure, router } from "../trpc";
import { topicSchema } from "@/schemas/topicSchema";
import { prisma } from "../../../lib/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Simulate } from "react-dom/test-utils";

export const appRouter = router({
  getTopics: procedure.input(z.string().optional()).query(async ({ input }) => {
    return await prisma.topic.findMany({
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        votedBy: { select: { id: true } },
      },
    });
  }),
  voteForTopic: procedure
    .input(z.object({ uid: z.string().optional(), tid: z.number() }))
    .mutation(async (req) => {
      if (req.input.uid) {
        const topic = await prisma.topic.findUnique({
          where: { id: req.input.tid },
          include: { votedBy: true },
        });

        if (topic) {
          let hasVoteAlready = topic.votedBy.some(
            (vote) => vote.id === req.input.uid
          );
          await prisma.topic.update({
            where: { id: req.input.tid },
            data: hasVoteAlready
              ? { votedBy: { disconnect: { id: req.input.uid } } }
              : { votedBy: { connect: { id: req.input.uid } } },
          });
        }
      }
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
          title: req.input.topic.title,
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
