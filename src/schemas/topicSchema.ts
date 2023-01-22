import { z } from "zod";

export const topicSchema = z.object({
  author: z.object({
    id: z.string(),
    firstName: z
      .string({ invalid_type_error: "Input must be a string" })
      .min(1, { message: "Must enter at least one character" })
      .refine((value) => value.match(/^[a-zA-Z]+$/), {
        message: "Numbers are not allowed",
      }),
    lastName: z.string().min(1),
  }),
  topic: z.object({
    title: z.string().min(1),
    description: z.string().max(150),
    type: z.string().refine((value) => {
      console.log(value);
      return ["Hands-On", "Vortrag", "Lightning Talk", "Diskussionsrunde"].includes(
        value
      );
    }),
  }),
});