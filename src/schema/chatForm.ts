import { z } from "zod";

export const chatFormSchema = z.object({
  chatMsg: z
    .string()
    .min(1, {
      message: "Message must be at least 1 char",
    })
    .max(500, {
      message: "Message can NOT be longer than 500 chars",
    }),
});
