import { procedure, router } from "../trpc";
import { topicSchema } from "@/schemas/topicSchema";
import { prisma } from "../../../lib/prisma";

export const appRouter = router({
  createTopic: procedure.input(topicSchema).mutation(async (req) => {
    const user = await prisma.user.findUnique({
      where: { id: req.input.author.id },
    });

    if (user) {
      await prisma.topic.create({
        data: {
          author: { connect: { id: user.id } },
          description: req.input.topic.description,
          Votes: 0,
          title: "Hello",
        },
      });
    }
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
