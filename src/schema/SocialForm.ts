import { z } from "zod";

export const socialFormSchema = z.object({
  platform: z.string().min(1).max(100),
  description: z.string().min(4).max(250).optional(),
  href: z.string().url().max(250),
});
