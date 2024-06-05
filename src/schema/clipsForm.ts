import { z } from "zod";

export const clipsFormSchema = z.object({
  channel: z.string(),
  game: z.string(),
});
