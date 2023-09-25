import * as zod from "zod";

const searchFriendsSchema = zod.object({
  username: zod.string(),
  profile: zod.string(),
  page: zod.string().optional()
})

export default searchFriendsSchema;