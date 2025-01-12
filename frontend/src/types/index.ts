import { z } from "zod";
import { IdParamSchema } from "@/schemas";

export type IdParam = z.infer<typeof IdParamSchema>;
