import * as z from "zod";

const sportSchema = z.object({
    name: z.string(),
});

export default sportSchema;