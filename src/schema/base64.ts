import { z } from "zod";

const base64Regex =
  /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

export const base64Schema = z
  .string()
  .refine((value) => base64Regex.test(value), {
    message: "Invalid Base64 string",
  });
